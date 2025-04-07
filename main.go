package main

import (
	"go-jwt/initializers"
	"go-jwt/routes"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	r := gin.Default()
	routes.AuthRoutes(r)

	r.Run()
}
