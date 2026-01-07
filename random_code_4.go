package main

import (
	crypto_rand "crypto/rand"
	"encoding/hex"
	"fmt"
	"log"
	"math/rand"
	"time"
)

var sayings = []string{
	"Keep it simple.",
	"Ship small, ship often.",
	"Measure twice, cut once.",
	"Focus on the signal.",
	"Sleep fixes more bugs than coffee.",
}

func randomHex(n int) string {
	b := make([]byte, n)
	if _, err := crypto_rand.Read(b); err != nil {
		log.Fatalf("random read: %v", err)
	}
	return hex.EncodeToString(b)
}

func randomSaying() string {
	return sayings[rand.Intn(len(sayings))]
}

func main() {
	rand.Seed(time.Now().UnixNano())
	fmt.Println("Random hex id:", randomHex(6))
	fmt.Println("Random saying:", randomSaying())
}


