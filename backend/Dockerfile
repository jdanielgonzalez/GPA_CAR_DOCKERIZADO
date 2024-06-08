# Usa una imagen base de Golang
FROM golang:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo go.mod y go.sum para descargar las dependencias
COPY go.mod .
COPY go.sum .

# Descarga las dependencias
RUN go mod download

# Copia el resto de los archivos del proyecto
COPY . .

# Compila el proyecto
RUN go build -o main .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["./main"]
