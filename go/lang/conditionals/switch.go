package main 

import "fmt"


func main(){
	status := "Active"

	switch status{
		case "Active":
			fmt.Println("Active status")
		case "Offline":
			fmt.Println("Offline status")
		default:
			fmt.Println("unknown status")	
	}
}