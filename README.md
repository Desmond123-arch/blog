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
	Id
	Title string `json:"title" validate:"required"`
	SubHeading string `json:"subheading" validate:"required"`
	Author string `json:"author" validate:"required"`
	Content string `json:"content"`
	PublishDate string `json:"publishedDate" validate:"required"`
	ImageUrl string `json:"imageUrl" validate:"required"`
```

### Success Response
```json
{
  "blogs": {
    "id": 1,
    "title": "Your Title",
    "content": "Your Content"
  }
}
```

### Error Response
```json
{
  "validation_errors": {
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
│   │   └── database.go
│   ├── models/
│   │   └── blog.go
│   └── routes/
│       └── routes.go
└── main.go
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
