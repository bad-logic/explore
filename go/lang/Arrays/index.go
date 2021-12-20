/*

	syntax:  var <name of array> [<size of array>]<type of data stored in the array>

*/

package main

import "fmt"

func main() {
	var favNum [3]int
	favFoods := [4]string{"salami", "pizza", "fries", "steak"}

	// insert in array
	favNum[0] = 1
	favNum[1] = 2
	favNum[2] = 3

	fmt.Println(favNum)
	fmt.Println(favFoods)

	// access array members
	fmt.Println(favFoods[3])

}
