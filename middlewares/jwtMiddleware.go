package middlewares

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func JwtMiddleware(c *gin.Context) {
	fmt.Println("middleware in")

	c.Next()

}
