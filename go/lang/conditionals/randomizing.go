

package main  

import (
	"fmt"
	"math/rand"
	"time"
)


func main(){
	// using constant number as a seed always results in same random value
	// rand.Seed(18) // by default uses 1 as seed value
	rand.Seed(time.Now().UnixNano()) 
	fmt.Println(rand.Intn(100)) // random numbers less than 100
}