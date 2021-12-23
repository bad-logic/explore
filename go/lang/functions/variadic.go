/*

A variadic function is a function that accepts a variable number of arguments.
In Golang, it is possible to pass a varying number of arguments of the same type
as referenced in the function signature. To declare a variadic function, the type
of the final parameter is preceded by an ellipsis, "...", which shows that the
function may be called with any number of arguments of this type.

*/

package main

import (
	"fmt"
	"reflect"
)

func sum(intarr ...int) (total int) {
	for _, val := range intarr {
		total += val
	}
	return
}

func getType(any ...interface{}) {
	for _, val := range any {

		fmt.Println(val, reflect.ValueOf(val).Kind())
	}
}

func main() {
	fmt.Println("sum", sum(1, 2, 3, 4, 5))
	getType(sum(1, 2, 3, 4, 5))
	getType("hello")
}
