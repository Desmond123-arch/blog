FROM golang:1.23-alpine

WORKDIR /usr/app/api

COPY go.mod .

RUN go mod download

COPY . .

EXPOSE 8080

ENTRYPOINT [ "go", "run", "." ]