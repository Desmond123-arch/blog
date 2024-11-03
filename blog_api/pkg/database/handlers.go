package database

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/stdlib"
	"github.com/joho/godotenv"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
)

func SetupDatabase() (*bun.DB, error){
	// urlExample := "postgres://username:password@localhost:5432/database_name"
	err := godotenv.Load()
	if err != nil {
		//TODO[]: Setup Log file for this
		fmt.Println("Env could not be loaded")
	}
	config, err := pgxpool.ParseConfig(os.Getenv("POSTGRES_URL"))
	if err != nil {
		fmt.Println("Database connection failed");
	}

	config.ConnConfig.DefaultQueryExecMode = pgx.QueryExecModeSimpleProtocol

	pool, err := pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		fmt.Println("Database connection failed");
	}
	
	sqldb := stdlib.OpenDBFromPool(pool)
	db := bun.NewDB(sqldb, pgdialect.New())
	return db, nil
}