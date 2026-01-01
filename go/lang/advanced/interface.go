/*

	type Student interface{
		getName() string
		PrintAddress(id int)
	}


	EMPTY INTERFACE
	interface_name interface{}

	does not have any methods to be satisfied so every type satisfies empty interface


*/

package main

import "fmt"

type Student interface {
	PrintName(name string)
	PrintFees(sal int)
	PrintId()
}

type Std int

func (s Std) PrintName(name string) {
	fmt.Println(name)
}

func (s Std) PrintFees(sal int) {
	fmt.Println(sal)
}

func (s Std) PrintId() {
	fmt.Println(s)
}

func main() {
	var s1 Student

	s1 = Std(1002) // Std type has all the methods of interface Student, so Std satisfies Student
	s1.PrintFees(3400)
	s1.PrintName("john doe")
	s1.PrintId()
}
