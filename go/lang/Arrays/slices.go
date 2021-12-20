/*
	Slices are like arrays but they are dynamically resizable i.e. their size is not fixed similar.
	Slices are a layer of abstraction over arrays. So when on resizing, the underlying array is
	changed to a larger array and the contents are copied, but it is completely abstracted from the programmer.


	syntax: var <slice name> []<datatype of data stored in the slice>
*/

package main

import "fmt"

func main() {
	var arr_slice []int
	fav_items := []string{"table"}

	// using make function
	array := make([]int, 0, 5)
	// 0 is the initial length, and 5 is the initial capacity
	// which is later changed dynamically to meet the requirement

	array_short := make([]int, 0)

	// insert items
	arr_slice = append(arr_slice, 1)
	arr_slice = append(arr_slice, 2)
	fav_items = append(fav_items, "chair")

	fmt.Println("arr_slice", arr_slice)
	fmt.Println("fav_items", fav_items)
	fmt.Println("length of arr_slice", len(arr_slice))
	fmt.Println("capacity  of fav_items", cap(fav_items))

	fmt.Println("array", array)
	fmt.Println("array capacity", cap(array))
	fmt.Println("array length ", len(array))

	fmt.Println("array_short", array_short)
	fmt.Println("array_short capacity", cap(array_short))
	fmt.Println("array_short length ", len(array_short))

}
