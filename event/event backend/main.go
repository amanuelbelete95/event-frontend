package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func main() {
	// Initialize the database connection
	InitDB()
	defer CloseDB()

	r := mux.NewRouter()

	r.HandleFunc("/api/signup", SignupHandler).Methods("POST")
	r.HandleFunc("/api/events", EventsHandler).Methods("GET")
	r.HandleFunc("/api/events/{id}/email", SendEmailHandler).Methods("POST")
	r.HandleFunc("/api/events/{id}/confirm", ConfirmEventHandler).Methods("POST")

	log.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func SignupHandler(w http.ResponseWriter, r *http.Request) {
	var user struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	_, err := db.Exec(context.Background(), "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", user.Name, user.Email, user.Password)
	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("User created successfully"))
}

func EventsHandler(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query(context.Background(), "SELECT id, name, date, status FROM events")
	if err != nil {
		http.Error(w, "Failed to fetch events", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var events []struct {
		ID     int    `json:"id"`
		Name   string `json:"name"`
		Date   string `json:"date"`
		Status string `json:"status"`
	}
	for rows.Next() {
		var event struct {
			ID     int    `json:"id"`
			Name   string `json:"name"`
			Date   string `json:"date"`
			Status string `json:"status"`
		}
		if err := rows.Scan(&event.ID, &event.Name, &event.Date, &event.Status); err != nil {
			http.Error(w, "Failed to parse events", http.StatusInternalServerError)
			return
		}
		events = append(events, event)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(events)
}

func SendEmailHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	eventID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid event ID", http.StatusBadRequest)
		return
	}

	// Simulate email sending logic
	w.Write([]byte("Email sent for event ID: " + strconv.Itoa(eventID)))
}

func ConfirmEventHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	eventID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid event ID", http.StatusBadRequest)
		return
	}

	_, err = db.Exec(context.Background(), "UPDATE events SET status = 'Confirmed' WHERE id = $1", eventID)
	if err != nil {
		http.Error(w, "Failed to confirm event", http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Event confirmed successfully"))
}

// InitDB initializes the database connection
func InitDB() {
	// Database initialization logic here
}

// CloseDB closes the database connection
func CloseDB() {
	// Database cleanup logic here
}