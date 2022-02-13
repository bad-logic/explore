package main

import (
	module "firstPackage/pack1"
	"fmt"
)

func main() {
	f := new(module.Information)
	f.Name = "meta--info"

	fmt.Println(f.Meta())
}
