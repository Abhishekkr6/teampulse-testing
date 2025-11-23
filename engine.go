package main

import (
    "fmt"
    "math/rand"
    "time"
)

func spinWheel(slots int) int {
    if slots < 2 {
        slots = 2
    }
    rand.Seed(time.Now().UnixNano())
    return rand.Intn(slots)
}

func main() {
    for i := 0; i < 5; i++ {
        fmt.Printf("Spin %d landed on %d\n", i+1, spinWheel(10))
    }
}
