package main

import (
	"crypto/rand" //Works to generate random number ( works with big int to secure the random number )
	"encoding/json"
	"fmt"
	"math/big"
	"net/http"
	"time"

	"github.com/rs/cors"
)

type Data struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

var data = []Data{
	{ID: 1, Name: "Item 1"},
	{ID: 2, Name: "Item 2"},
}

func getDataHandler(w http.ResponseWriter, r *http.Request) { // Most basic/default handler
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func generateRandomNumber() (float64, error) {
	max := big.NewInt(6) // Max range 0 - n no inclusive
	n, err := rand.Int(rand.Reader, max)
	n2, err := rand.Int(rand.Reader, max)
	if err != nil {
		return 0, err
	}
	if float64(n2.Int64()) < 4 {
		return float64(n2.Int64()) + 0.5, nil
	} else {
		return float64(n.Int64()), nil
	}
}

func getRandomNumberHandler(w http.ResponseWriter, r *http.Request) {
	time.Sleep(3 * time.Second)
	number, err := generateRandomNumber() //Funciton call

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	response := map[string]float64{"randomNumber": number}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/data", getRandomNumberHandler)
	handler := cors.Default().Handler(mux)
	http.ListenAndServe("localhost:8080", handler)

	fmt.Println("Server is running on http://localhost:8080")
}
