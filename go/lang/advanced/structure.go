/*

	type struct_name struct{
		// data fields with name and type
	}

*/

package main

import (
	"encoding/json"
	"fmt"
	"reflect"
)

type Student struct {
	Name    string `json:"name`
	Address string `json:"address`
	Id      int    `json:"id"`
	Gender  string `json:"gender"`
}

// adding function to the structure using method receiver
func (s Student) Information() {
	fmt.Println("id", s.Id)
	fmt.Println("address", s.Address)
	fmt.Println("name", s.Name)
	fmt.Println("gender", s.Gender)
	fmt.Println("=============================")
}

func main() {
	var st Student
	student := Student{"hailee", "new-york", 12, "F"}
	st.Address = "paris"
	st.Gender = "M"
	st.Id = 44
	st.Name = "John"
	jStudent := `{"name":"rocxane","address":"pitsburg","gender":"F","id":344}`
	jstd := &Student{}
	// jstd :=  new(Student)

	json.Unmarshal([]byte(jStudent), jstd)
	fmt.Println(st, student, *jstd)
	st.Information()
	jstd.Information()

	fmt.Println(reflect.TypeOf(st)) // main.Student
	fmt.Println(reflect.ValueOf(st).Kind())
}
