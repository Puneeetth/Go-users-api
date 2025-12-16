# Go Backend Development Task – Reasoning

## Problem Understanding
The goal was to build a RESTful API in Go to manage users with name and date of birth, while calculating the user’s age dynamically during read operations. The system should use PostgreSQL for persistence, SQLC for type-safe database access, and follow clean backend design principles.

## Architecture
I structured the application using a layered architecture:

- Handler layer: Handles HTTP requests, validation, and HTTP responses.
- Service layer: Contains business logic such as age calculation and domain-level error handling.
- Repository layer: Wraps SQLC-generated queries and handles database interaction.
- Database layer: PostgreSQL with schema managed via SQL migrations.

This separation ensures maintainability, testability, and clear responsibility boundaries.

## Key Design Decisions
- SQLC was used to generate type-safe Go code from SQL queries, preventing runtime SQL errors.
- Age is not stored in the database; it is calculated dynamically using Go’s time package to avoid stale data.
- Domain-level errors (e.g., user not found) are handled in the service layer and mapped to HTTP responses in the handler layer.
- Environment variables are used for configuration to keep secrets out of code.

## Error Handling
- Validation errors return HTTP 400.
- Missing resources return HTTP 404.
- Unexpected errors return HTTP 500 with proper logging.

## Trade-offs and Improvements
Due to time constraints, features like pagination, authentication, and caching were not implemented. With more time, I would add unit tests, request logging middleware, pagination for list APIs, and Docker support.
