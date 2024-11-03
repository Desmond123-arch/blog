package routes

import (
	"fmt"
	"net/http"

	"github.com/Desmond123-arch/blog/blog_api/pkg/database"
	"github.com/gin-gonic/gin"
)

func Getall(ctx *gin.Context) {
	, err := database.SetupDatabase()
	if err != nil {
		fmt.Println("An error occured")
	}
	ctx.JSON(http.StatusAccepted, gin.H{"status":"got all"})
}
func GetOne(ctx *gin.Context) {
	ctx.JSON(http.StatusAccepted, gin.H{"status": "got one"})
}

func DeleteOne(ctx *gin.Context) {
	ctx.JSON(http.StatusAccepted, gin.H{"status":"deleted one"})
}

func PutOne(ctx *gin.Context) {
	ctx.JSON(http.StatusAccepted, gin.H{"status":"Updated One"})
}
func PostOne(ctx *gin.Context) {
	ctx.JSON(http.StatusAccepted, gin.H{"status":"Posted One"})
}