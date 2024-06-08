package models

type Usuario struct {
	Id              int    `json:"id" db:"id"`
	Documento       string `json:"documento" db:"documento"`
	Contrasena      string `json:"contrasena" db:"contrasena"`
	Nombres         string `json:"nombres" db:"nombres"`
	Apellidos       string `json:"apellidos" db:"apellidos"`
	Celular         string `json:"celular" db:"celular"`
	FechaNacimiento string `json:"fecha_nacimiento" db:"fecha_nacimiento"`
	Sexo            string `json:"sexo" db:"sexo"`
	Correo          string `json:"correo" db:"correo"`
}
