package models

import "time"

type Comentario struct {
	Id        int       `json:"id" db:"id"`
	TimeStamp time.Time `json:"time" db:"time"`
	Comment   string    `json:"comment" db:"comment"`
	Reactions uint      `json:"reactions" db:"reactions"`
}
