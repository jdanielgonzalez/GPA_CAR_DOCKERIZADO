package models

type Vehiculo struct {
	Id              int    `json:"id" db:"id"`
	Tipo            string `json:"tipo" db:"tipo"`
	Color           string `json:"color" db:"color"`
	Modelo          string `json:"modelo" db:"modelo"`
	Marca           string `json:"marca" db:"marca"`
	Placa           string `json:"placa" db:"placa"`
	Titulo          string `json:"titulo" db:"titulo"`
	Descripcion     string `json:"descripcion" db:"descripcion"`
	Transimision    string `json:"transimision" db:"transimision"`
	Capacidad       string `json:"capacidad" db:"capacidad"`
	Ubicacion       string `json:"ubicacion" db:"ubicacion"`
	Precio          string `json:"precio" db:"precio"`
	Disponible      string `json:"disponible" db:"disponible"`
	Urlfoto         string `json:"urlfoto" db:"urlfoto"`
	Clienteasignado string `json:"clienteasignado" db:"clienteasignado"`
}
