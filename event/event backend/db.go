package main

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

var db *pgxpool.Pool

func InitDB() {
	var err error
	db, err = pgxpool.New(context.Background(), "postgres://username:password@localhost:5432/eventdb")
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}
	log.Println("Connected to the database successfully")
}

func CloseDB() {
	db.Close()
}