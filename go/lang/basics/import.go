package main
// import f "fmt" // aliasing

// bulk import + aliasing 
// separated by new line instead of comma
import (
	f "fmt"
	t "time"
	)

func main(){
	f.Println("aliasing imports")
	f.Println(t.Now())
}