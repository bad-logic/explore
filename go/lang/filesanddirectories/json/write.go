package main

import (
	"encoding/json"
	"io/ioutil"
)

type Salary struct {
	Basic, HRA, TA float64
}

type Employee struct {
	FirstName, LastName, Email string
	Age                        int
	MonthlySalary              []Salary
}

func main() {
	data := Employee{
		FirstName: "Foo",
		LastName:  "Bar",
		Email:     "foo.bar@xyz.com",
		Age:       34,
		MonthlySalary: []Salary{
			{
				Basic: 4594.89,
				HRA:   1235.008,
				TA:    456.87,
			},
			{
				Basic: 45394.89,
				HRA:   1435.008,
				TA:    1456.87,
			},
		},
	}

	file, _ := json.MarshalIndent(data, "", "")
	ioutil.WriteFile("emp.json", file, 0644)
}
