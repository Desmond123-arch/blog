package models


type Blog struct {
	Id string `json:"id"`
	Title string `json:"title"`
	SubHeading string `json:"subheading"`
	Author string `json:"author"`
	Content string `json:"content"`
	PublishDate string `json:"publishedDate"`
	ImageUrl string `json:"imageUrl"`
}