package service

import (
	"context"
	"database/sql"
	"go-users-api/internal/models"
	"go-users-api/internal/repository"
	"time"
)

type UserService struct {
	repo *repository.UserRepository
}

func NewUserService(r *repository.UserRepository) *UserService {
	return &UserService{repo: r}
}

func (s *UserService) Create(ctx context.Context, name string, dob time.Time) (models.User, error) {
	u, err := s.repo.Create(ctx, name, dob)
	if err != nil {
		return models.User{}, err
	}

	return models.User{
		ID:   u.ID,
		Name: u.Name,
		DOB:  u.Dob,
	}, nil
}

func (s *UserService) GetByID(ctx context.Context, id int64) (models.User, error) {
	u, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return models.User{}, err
	}

	return models.User{
		ID:   u.ID,
		Name: u.Name,
		DOB:  u.Dob,
		Age:  calculateAge(u.Dob),
	}, nil
}

func (s *UserService) List(ctx context.Context) ([]models.User, error) {
	users, err := s.repo.List(ctx)
	if err != nil {
		return nil, err
	}

	result := make([]models.User, 0, len(users))
	for _, u := range users {
		result = append(result, models.User{
			ID:   u.ID,
			Name: u.Name,
			DOB:  u.Dob,
			Age:  calculateAge(u.Dob),
		})
	}

	return result, nil
}

func (s *UserService) Update(ctx context.Context, id int64, name string, dob time.Time) (models.User, error) {
	u, err := s.repo.Update(ctx, id, name, dob)
	if err != nil {
		if err == sql.ErrNoRows {
			return models.User{}, ErrUserNotFound
		}
		return models.User{}, err
	}

	return models.User{
		ID:   u.ID,
		Name: u.Name,
		DOB:  u.Dob,
	}, nil
}

func (s *UserService) Delete(ctx context.Context, id int64) error {
	return s.repo.Delete(ctx, id)
}

func calculateAge(dob time.Time) int {
	now := time.Now()
	age := now.Year() - dob.Year()

	if now.YearDay() < dob.YearDay() {
		age--
	}
	return age
}
