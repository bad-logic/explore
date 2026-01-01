/*
	Operator	Name	Description
		&		AND			Sets each bit to 1 if both bits are 1
		|		OR			Sets each bit to 1 if one of two bits is 1
		^		XOR			Sets each bit to 1 if only one of two bits is 1
		<<		Zero 		fill left shift	Shift left by pushing zeros in from the right and let the leftmost bits fall off
		>>		Signed 		right shift	Shift right by pushing copies of the leftmost bit in from the left, and let the rightmost bits fall off

*/

package main

import "fmt"

func main() {
	var x uint = 9  //0000 1001
	var y uint = 65 //0100 0001
	var z uint

	z = x & y
	fmt.Println("x & y  =", z)

	z = x | y
	fmt.Println("x | y  =", z)

	z = x ^ y
	fmt.Println("x ^ y  =", z)

	z = x << 1
	fmt.Println("x << 1 =", z)

	z = x >> 1
	fmt.Println("x >> 1 =", z)
}
