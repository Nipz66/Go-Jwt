package routes

import (
	"go-jwt/controllers"
	"go-jwt/middlewares"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {

	r.POST("auth/signup", controllers.Signup)
	r.POST("auth/login", controllers.Login)
	r.GET("auth/validate", middlewares.JwtMiddleware, controllers.Validate)
}
