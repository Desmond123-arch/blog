package main

import (
	"github.com/Desmond123-arch/blog/blog_api/pkg/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	
	// CRUD endpoints
	r.GET("/", routes.Getall)
	r.POST("/",routes.PostOne)
	r.GET("/:id", routes.GetOne)
	r.PUT("/:id",routes.PutOne )
	r.DELETE("/:id", routes.DeleteOne)

	r.Run()
}