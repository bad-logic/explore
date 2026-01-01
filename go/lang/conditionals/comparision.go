/* 
	Operator	Meaning:
		==		Is equal to
		!=		Is NOT equal to
		<		Less than
		>		Greater than
		<=		Less than or equal to
		>=		Greater than or equal to
 */

 package main

 import "fmt"


 func main(){
	num1 := 45
	num2 := 90
	if(num1 == num2){
		fmt.Println("equal")
	}else if(num1 > num2){
		fmt.Println(num1 ,"is greater")
	}else{
		fmt.Println(num2 ,"is greater")
	}
 }