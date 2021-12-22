/*
	Operator	Description			Example		Result
	+			Addition			x + y		Sum of x and y
	-			Subtraction			x - y		Subtracts one value from another
	*			Multiplication		x * y		Multiplies two values
	/			Division			x / y		Quotient of x and y
	%			Modulus				x % y		Remainder of x divided by y
	++			Increment			x++			Increases the value of a variable by 1
	--			Decrement			x--			Decreases the value of a variable by 1
*/

package main

import "fmt"

func main() {
	var x, y = 35, 7

	fmt.Printf("x + y = %d\n", x+y)
	fmt.Printf("x - y = %d\n", x-y)
	fmt.Printf("x * y = %d\n", x*y)
	fmt.Printf("x / y = %d\n", x/y)
	fmt.Printf("x mod y = %d\n", x%y)

	x++
	fmt.Printf("x++ = %d\n", x)

	y--
	fmt.Printf("y-- = %d\n", y)
}
