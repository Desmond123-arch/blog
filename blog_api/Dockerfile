FROM golang:1.23-alpine

WORKDIR /usr/app/api

COPY go.mod go.sum ./

RUN go mod tidy

COPY . .

EXPOSE 8080

ENTRYPOINT [ "go", "run", "." ]