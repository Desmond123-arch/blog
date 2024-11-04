package main

import (
	"fmt"
	"os"

	"github.com/Desmond123-arch/blog/blog_api/pkg/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	
	//Log file setup
	logFile, err := os.OpenFile("gin.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		fmt.Println("Could not open log file:", err)
		return
	}
	defer logFile.Close()

	gin.DefaultWriter = logFile
	gin.DefaultErrorWriter = logFile

	// CRUD endpoints
	r.GET("/", routes.Getall)
	r.POST("/",routes.PostOne)
	r.GET("/:id", routes.GetOne)
	r.PUT("/:id",routes.PutOne )
	r.DELETE("/:id", routes.DeleteOne)
	port := os.Getenv("PORT")
	r.Run(port)
}