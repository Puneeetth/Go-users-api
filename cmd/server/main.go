// @title Go Users API
// @version 1.0
// @description REST API for managing users and calculating age dynamically
// @host localhost:8080
// @BasePath /

package main

import (
	"go-users-api/config"
	"go-users-api/db/sqlc"
	"go-users-api/internal/handler"
	"go-users-api/internal/repository"
	"go-users-api/internal/routes"
	"go-users-api/internal/service"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	swagger "github.com/gofiber/swagger"

	_ "go-users-api/docs"
)

func main() {
	db := config.SetupDB()

	queries := sqlc.New(db)

	userRepo := repository.NewUserRepository(queries)
	userService := service.NewUserService(userRepo)
	userHandler := handler.NewUserHandler(userService)

	app := fiber.New()

	// Enable CORS for frontend requests
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Get("/swagger/*", swagger.HandlerDefault)

	routes.RegisterUserRoutes(app, userHandler)

	log.Fatal(app.Listen(":8080"))
}
