package models

import "time"

type Orden struct {
	Id          int       `json:"id" db:"id"`
	TimeStamp   time.Time `json:"time" db:"created_at"`
	Cliente     string    `json:"cliente" db:"cliente"`
	Conductor   string    `json:"conductor" db:"conductor"`
	CostoBasico string    `json:"costobasico" db:"costobasico"`
	Documento   string    `json:"documento" db:"documento"`
	IdConjunto  string    `json:"idconjunto" db:"idconjunto"`
	IdItem      string    `json:"iditem" db:"iditem"`
	Placa       string    `json:"placa" db:"placa"`
	Seguro      string    `json:"seguro" db:"seguro"`
	Silla       string    `json:"silla" db:"silla"`
	Titulo      string    `json:"titulo" db:"titulo"`
	TotalCosto  string    `json:"totalcosto" db:"totalcosto"`
}
