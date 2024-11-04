package models

import (
	// "github.com/go-playground/validator/v10"
	"github.com/uptrace/bun"
)


type Blog struct {
	bun.BaseModel `bun:"table:blogs"`

	Id int64 `json:"id"  bun:",pk,autoincrement"`
	Title string `json:"title" validate:"required"`
	SubHeading string `json:"subheading" validate:"required"`
	Author string `json:"author" validate:"required"`
	Content string `json:"content"`
	PublishDate string `json:"publishedDate" validate:"required"`
	ImageUrl string `json:"imageUrl" validate:"required"`
}