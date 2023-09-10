package hello

import "fmt"

func SayHello() {
	fmt.Printf(Greeting())
}

func Greeting() string {
    return "Hello, World"
}
