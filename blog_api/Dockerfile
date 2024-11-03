FROM go:1.23

WORKDIR /usr/app/api

COPY go.mod go.sum ./

RUN go mod tidy

COPY . .

EXPOSE 8080

ENTRYPOINT [ "go", "run", "." ]