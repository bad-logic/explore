/*
	Polymorphism is the ability to write code that can take on different behavior through the implementation of types.

	We have the declaration of a structs named Pentagon, Hexagon, Octagon and Decagon with the implementation of the
	Geometry interface.
*/
package main

import "fmt"

type Geometry interface {
	Edges() int
}

type Pentagon struct{}

type Hexagon struct{}

type Octagon struct{}

type Decagon struct{}

func (p Pentagon) Edges() int {
	return 5
}

func (p Hexagon) Edges() int {
	return 6
}

func (p Octagon) Edges() int {
	return 8
}

func (p Decagon) Edges() int {
	return 10
}

func Parameter(geo Geometry, value int) int {
	num := geo.Edges()
	calculation := num * value
	return calculation
}

func main() {
	P := new(Pentagon)
	H := new(Hexagon)
	O := new(Octagon)
	D := new(Decagon)

	g := []Geometry{P, H, O, D}

	for _, i := range g {
		fmt.Println(Parameter(i, 5))
	}

}
