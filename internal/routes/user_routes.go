package routes

import (
	"go-users-api/internal/handler"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
)

func RegisterUserRoutes(app *fiber.App, h *handler.UserHandler) {
	app.Post("/users", h.CreateUser)
	app.Get("/users/:id", h.GetUser)
	app.Get("/users", h.ListUsers)
	app.Put("/users/:id", h.UpdateUser)
	app.Delete("/users/:id", h.DeleteUser)
	app.Get("/swagger/*", swagger.HandlerDefault)

}
