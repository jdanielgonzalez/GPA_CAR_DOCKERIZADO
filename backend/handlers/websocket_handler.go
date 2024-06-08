package handlers

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool) // Conjunto de clientes conectados
var broadcast = make(chan Message)           // Canal para mensajes entrantes

// Configuración de la actualización de WebSocket
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// Estructura del mensaje
type Message struct {
	Message string `json:"message"`
}

func HandleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer ws.Close()

	// Registrar el nuevo cliente
	clients[ws] = true

	for {
		var msg Message
		// Leer el mensaje del cliente
		err := ws.ReadJSON(&msg)
		if err != nil {
			fmt.Println("Error leyendo el mensaje:", err)
			delete(clients, ws)
			break
		}
		// Enviar el mensaje al canal broadcast
		broadcast <- msg
	}
}

func HandleMessages() {
	for {
		// Obtener el siguiente mensaje del canal broadcast
		msg := <-broadcast
		// Enviar el mensaje a todos los clientes conectados
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				fmt.Println("Error escribiendo el mensaje:", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}
