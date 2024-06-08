package main

import (
	"log"
	"net/http"

	"github.com/jmoiron/sqlx"
	"github.com/juanpa93/Proyecto1/controllers"
	"github.com/juanpa93/Proyecto1/handlers"
	"github.com/juanpa93/Proyecto1/models"
	"github.com/juanpa93/Proyecto1/repository"
	_ "github.com/lib/pq"
)

func main() {
	// Conexión a BD
	conn, err := ConectarDB("database-1.cvscqwywqe47.us-east-2.rds.amazonaws.com", "postgres")
	if err != nil {
		log.Fatalln("Fallo al conectar a la bd", err.Error())
		return
	}

	// Instancia Comentario
	bd, err := repository.NewRepository[models.Comentario](conn)
	if err != nil {
		log.Fatalln("Fallo al crear una instancia", err.Error())
		return
	}

	// Instancia Usuario
	bd2, err := repository.NewRepository[models.Usuario](conn)
	if err != nil {
		log.Fatalln("Fallo al crear una instancia", err.Error())
		return
	}

	// Instancia Usuario
	bd4, err := repository.NewRepository[models.Vehiculo](conn)
	if err != nil {
		log.Fatalln("Fallo al crear una instancia", err.Error())
		return
	}

	// Ctrl Comentario
	controller, err := controllers.NewController(bd)
	if err != nil {
		log.Fatalln("Fallo al crear controlador", err.Error())
		return
	}

	// Ctrl Usuario
	controllerUser, err := controllers.NewControllerUser(bd2)
	if err != nil {
		log.Fatalln("Fallo al crear controlador", err.Error())
		return
	}

	controllerVehiculo, err := controllers.NewControllerVehiculo(bd4)
	if err != nil {
		log.Fatalln("Fallo al crear controlador", err.Error())
		return
	}

	handlerVehiculo, err5 := handlers.NewHandlerVehiculos(controllerVehiculo)
	if err5 != nil {
		log.Fatalln("Fallo al crear instancia de Handler", err5.Error())
		return
	}
	// handler Comentarios
	handler, err := handlers.NewHandlerComentarios(controller)
	if err != nil {
		log.Fatalln("Fallo al crear instancia de Handler", err.Error())
		return
	}

	// handler Usuarios
	handlerUser, err2 := handlers.NewHandlerUsuarios(controllerUser)
	if err2 != nil {
		log.Fatalln("Fallo al crear instancia de Handler", err2.Error())
		return
	}

	// Instancia Orden
	bd3, err := repository.NewRepository[models.Orden](conn)
	if err != nil {
		log.Fatalln("Fallo al crear una instancia", err.Error())
		return
	}

	// Ctrl Orden
	controllerOrden, err3 := controllers.NewControllerOrden(bd3)
	if err3 != nil {
		log.Fatalln("Fallo al crear controlador", err3.Error())
		return
	}

	// handler Ordenes
	handlerOrden, err2 := handlers.NewHandlerOrdenes(controllerOrden)
	if err2 != nil {
		log.Fatalln("Fallo al crear instancia de Handler", err2.Error())
		return
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/posts", handler.ListarComentarios()) //trae todo de la base Comentarios
	//mux.HandleFunc("/posts2/{id}", handler.ListarComentarios2()) //trae resultados filtrados de Comentarios
	//mux.HandleFunc("/posts", handler.CrearComentario())
	/*mux.HandleFunc("/posts/{id}", handler.TraerComentario())
	mux.HandleFunc("/posts/{id}", handler.ActualizarComentario())
	mux.HandleFunc("/posts/{id}", handler.EliminarComentario())*/

	mux.HandleFunc("/actualizar/{id}", handlerVehiculo.ActualizarVehiculo())
	mux.HandleFunc("/listarcarros", handlerVehiculo.ListarCarros())
	mux.HandleFunc("/listarordenes/{id}", handlerOrden.ListarOrdenes())
	mux.HandleFunc("/registro", handler.CrearUsuario())
	mux.HandleFunc("/ordenes", handler.CrearOrden())
	mux.HandleFunc("/iniciar", handlerUser.IniciarSesion())
	mux.HandleFunc("/validacion", handlerUser.ConsultarCorreo())
	mux.HandleFunc("/infouser/{id}", handlerUser.TraerUsuario())

	// Ruta para WebSocket
	mux.HandleFunc("/ws", handlers.HandleConnections)

	// Iniciar goroutine para manejar mensajes
	go handlers.HandleMessages()

	log.Fatal(http.ListenAndServe(":3000", mux))
}

func ConectarDB(url, driver string) (*sqlx.DB, error) {
	connStr := "postgres://postgres.cmrpltvicqtfyevfqumk:proyecto_prueba@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
	db, err := sqlx.Connect(driver, connStr)
	if err != nil {
		log.Printf("fallo la conexion a PostgreSQL, error: %s", err.Error())
		return nil, err
	}

	log.Printf("Nos conectamos bien a la base de datos db: %#v", db)
	return db, nil
}
