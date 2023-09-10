package hello

import "testing"

func TestGreeting(t *testing.T) {
    greeting := Greeting()
    if greeting != "Hello, World" {
        t.Errorf("Greeting() = %s; want Hello, World", greeting)
    }
}
