package main

import (
	"fmt"
	"os"
)

func greet(name string) {
	fmt.Printf("Hello, %s!\n", name)
}

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: greet <name>")
		return
	}
	greet(os.Args[1])
}
