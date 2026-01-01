package pack1

import "fmt"

func init() {
	// perform initialisation work for mod1
	fmt.Println("package pack1 initialized")
}

type Information struct {
	Name string
}

func (m Information) Meta() string {
	return m.Name
}
