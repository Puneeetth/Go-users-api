package handler

import (
	_ "go-users-api/internal/models"
	"go-users-api/internal/service"
	"log"
	"strconv"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type UserHandler struct {
	service  *service.UserService
	validate *validator.Validate
}

func NewUserHandler(s *service.UserService) *UserHandler {
	return &UserHandler{
		service:  s,
		validate: validator.New(),
	}
}

type CreateUserRequest struct {
	Name string `json:"name" validate:"required,min=2"`
	DOB  string `json:"dob" validate:"required,datetime=2006-01-02"`
}

// CreateUser godoc
// @Summary Create a new user
// @Description Create a user with name and date of birth
// @Tags Users
// @Accept json
// @Produce json
// @Param user body CreateUserRequest true "User payload"
// @Success 201 {object} models.User
// @Failure 400 {object} fiber.Error
// @Failure 500 {object} fiber.Error
// @Router /users [post]
func (h *UserHandler) CreateUser(c *fiber.Ctx) error {
	var req CreateUserRequest
	if err := c.BodyParser(&req); err != nil {
		log.Println("Body parse error:", err)
		return fiber.ErrBadRequest
	}

	if err := h.validate.Struct(req); err != nil {
		log.Println("Validation error:", err)
		return fiber.ErrBadRequest
	}

	dob, err := time.Parse("2006-01-02", req.DOB)
	if err != nil {
		log.Println("DOB parse error:", err)
		return fiber.ErrBadRequest
	}

	user, err := h.service.Create(c.Context(), req.Name, dob)
	if err != nil {
		log.Println("SERVICE CREATE ERROR:", err)
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusCreated).JSON(user)
}

// GetUser godoc
// @Summary Get user by ID
// @Tags Users
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {object} models.User
// @Failure 404 {object} fiber.Error
// @Router /users/{id} [get]
func (h *UserHandler) GetUser(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return fiber.ErrBadRequest
	}

	user, err := h.service.GetByID(c.Context(), int64(id))
	if err != nil {
		return fiber.ErrNotFound
	}

	return c.JSON(user)
}

// ListUsers godoc
// @Summary List all users
// @Tags Users
// @Produce json
// @Success 200 {array} models.User
// @Router /users [get]
func (h *UserHandler) ListUsers(c *fiber.Ctx) error {
	users, err := h.service.List(c.Context())
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.JSON(users)
}

// UpdateUser godoc
// @Summary Update user
// @Tags Users
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Param user body CreateUserRequest true "Updated user"
// @Success 200 {object} models.User
// @Failure 404 {object} fiber.Error
// @Router /users/{id} [put]
func (h *UserHandler) UpdateUser(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return fiber.ErrBadRequest
	}

	var req CreateUserRequest
	if err := c.BodyParser(&req); err != nil {
		return fiber.ErrBadRequest
	}

	if err := h.validate.Struct(req); err != nil {
		return fiber.ErrBadRequest
	}

	dob, err := time.Parse("2006-01-02", req.DOB)
	if err != nil {
		return fiber.ErrBadRequest
	}

	user, err := h.service.Update(c.Context(), int64(id), req.Name, dob)
	if err != nil {
		if err == service.ErrUserNotFound {
			return fiber.ErrNotFound
		}
		return fiber.ErrInternalServerError
	}

	return c.JSON(user)
}

// DeleteUser godoc
// @Summary Delete user
// @Tags Users
// @Param id path int true "User ID"
// @Success 204
// @Failure 404 {object} fiber.Error
// @Router /users/{id} [delete]
func (h *UserHandler) DeleteUser(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return fiber.ErrBadRequest
	}

	if err := h.service.Delete(c.Context(), int64(id)); err != nil {
		return fiber.ErrInternalServerError
	}

	return c.SendStatus(fiber.StatusNoContent)
}
