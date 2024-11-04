package routes

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/Desmond123-arch/blog/blog_api/pkg/database"
	"github.com/Desmond123-arch/blog/blog_api/pkg/models"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/locales/en"
	"github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	en_translations "github.com/go-playground/validator/v10/translations/en"
)

var validate *validator.Validate
var db, err = database.SetupDatabase()

func init() {
	if err != nil {
		log.Fatalf("Database Error: %s", err)
		return
	}
	validate = validator.New()
	eng := en.New()
	uni := ut.New(eng, eng)
	translator, _ := uni.GetTranslator("eng")

	en_translations.RegisterDefaultTranslations(validate, translator)

	validate.RegisterTranslation("required", translator, func(ut ut.Translator) error {
		return ut.Add("required", "{0} is a required field!", true)
	},
		func(ut ut.Translator, fe validator.FieldError) string {
			t, _ := ut.T("required", fe.Field())
			return t
		})
}

func validationErrors(tag string) string {
	switch tag {
	case "required":
		return "Field is required"
	default:
		return "Validation failed"
	}
}

func Getall(ctx *gin.Context) {

	if err != nil {
		fmt.Println("An error occurred")
	}
	_, err = db.NewCreateTable().Model((*(models.Blog))(nil)).IfNotExists().Exec(ctx)
	if err != nil {
		log.Printf("Database Error: %s", err)
		return
	}
	var blogs []models.Blog
	err = db.NewSelect().Model(&blogs).Scan(ctx)
	if err != nil {
		log.Printf("Database Error: %s", err)
		return
	}
	if len(blogs) == 0 {
		ctx.JSON(http.StatusNoContent, []models.Blog{})
		return
	}
	ctx.JSON(http.StatusAccepted, blogs)
}

func GetOne(ctx *gin.Context) {
	id := ctx.Param("id")
	post := new(models.Blog)
	err := db.NewSelect().Model(post).Where("id = ?", id).Scan(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	if post.Id == 0 {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "No results found"})
		return
	}
	ctx.JSON(http.StatusAccepted, post)
}

func DeleteOne(ctx *gin.Context) {
	id := ctx.Param("id")
	_, err := db.NewDelete().Model((*models.Blog)(nil)).Where("id = ?", id).Exec(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "No results found"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Post deleted successfully"})
}

func PutOne(ctx *gin.Context) {
	updatePost := new(models.Blog)
	id := ctx.Param("id")

	
	updatePost.Id, _ = strconv.ParseInt(id, 10, 64)
	if err := ctx.BindJSON(updatePost); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	exists, err := db.NewSelect().Model((*models.Blog)(nil)).Where("id = ?", id).Exists(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "An unexpected error occurred"})
		return
	}

	//check if item is in db
	if !exists {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Resource does not exist"})
		return
	}
	_, err = db.NewUpdate().Model(updatePost).Where("id = ?", id).Exec(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error doing updates"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": updatePost})
}

func PostOne(ctx *gin.Context) {
	newPost := new(models.Blog)

	if err := ctx.BindJSON(newPost); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	if err := validate.Struct(newPost); err != nil {
		errs := make(map[string]string)
		for _, err := range err.(validator.ValidationErrors) {
			errs[err.Field()] = validationErrors(err.Tag())
		}
		ctx.JSON(http.StatusBadRequest, gin.H{"validation_errors": errs})
	}

	_, err = db.NewCreateTable().Model((*(models.Blog))(nil)).IfNotExists().Exec(ctx)
	if err != nil {
		log.Printf("Database Error: %s", err)
		return 
	}
	_, err = db.NewInsert().Model(newPost).Exec(ctx)
	if err != nil {
		log.Printf("Database Error: %s", err)
		return 
	}
	ctx.JSON(http.StatusAccepted, gin.H{"blogs": newPost})
}
