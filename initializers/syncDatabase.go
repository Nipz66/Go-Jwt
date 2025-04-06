package initializers

import (
	"go-jwt/model"
)

func SyncDatabase() {
	DB.AutoMigrate(&model.User{})

}
