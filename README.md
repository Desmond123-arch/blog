# Blog API

A RESTful API built with Go (Golang) using the Gin web framework and Bun as the database ORM. This API provides endpoints for managing blog posts with full CRUD (Create, Read, Update, Delete) operations.

## Features

- CRUD operations for blog posts
- Input validation using go-playground/validator
- Custom validation error messages
- Database operations using Bun ORM
- RESTful API architecture
- Error handling and appropriate HTTP status codes

## Prerequisites

- Go 1.x or higher
- PostgreSQL database
- Git

## Dependencies

- [Gin](https://github.com/gin-gonic/gin) - Web framework
- [Bun](https://bun.uptrace.dev/) - Database ORM
- [go-playground/validator](https://github.com/go-playground/validator) - Input validation
- [go-playground/universal-translator](https://github.com/go-playground/universal-translator) - Translation support

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Desmond123-arch/blog/blog_api.git
cd blog_api
```

2. Install dependencies:
```bash
go mod download
```

3. Set up your database configuration in the `database` package (ensure PostgreSQL is running)

4. Run the application:
```bash
go run main.go
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /blogs   | Retrieve all blog posts |
| GET    | /blogs/:id | Retrieve a specific blog post |
| POST   | /blogs   | Create a new blog post |
| PUT    | /blogs/:id | Update an existing blog post |
| DELETE | /blogs/:id | Delete a blog post |

## Request/Response Examples

### Create a Blog Post
```bash
POST /blogs
Content-Type: application/json

{
  Id
	Title
	SubHeading
	Author
	Content
	PublishDate
	ImageUrl
}
```

### Success Response
```json
{
  Id: 
	Title: ""
	SubHeading: ""
	Author: ""
	Content: ""
	PublishDate: ""
	ImageUrl: ""
}
```

### Error Response
```json
{
  "error": {
    "Title": "Field is required"
  }
}
```

## Error Handling

The API includes comprehensive error handling:
- Validation errors with custom messages
- Database operation errors
- Resource not found errors
- Bad request handling

## Project Structure

```
blog_api/
├── pkg/
│   ├── database/
│   │   └── handlers.go
│   ├── models/
│   │   └── blogs.go
│   └── routes/
│       └── crud.go
└── main.go
```

[Live url](https://blog-ff9k.onrender.com)


### Might link with frontend later