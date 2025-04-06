package controllers

import (
	"go-jwt/initializers"
	"go-jwt/model"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {

	//get the userName/email/password off req body
	var body struct {
		UserName string
		Email    string
		Password string
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read Body !",
		})
		return
	}

	//Hash the password

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash Password !",
		})
		return
	}

	//create the user
	user := model.User{UserName: body.UserName, Email: body.Email, Password: string(hashPassword)}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to Create User !",
		})
		return
	}

	//Respond
	c.JSON(http.StatusOK, gin.H{})
}
