package main

import (
	"fmt"
	"unicode"
)

type Cipher interface {
	Encryption(string) string
	Decryption(string) string
}

type cipher []int

func (c cipher) cipherAlgorithm(text string, shift func(int, int) int) string {
	shiftedText := ""
	for _, letter := range text {
		if !unicode.IsLetter(letter) {
			continue
		}
		shiftDist := c[len(shiftedText)%len(c)]             // or c[0]
		s := shift(int(unicode.ToLower(letter)), shiftDist) // returns ascci code
		shiftedText += string(s)
	}
	return shiftedText
}

func (c *cipher) Encryption(plainText string) string {
	fmt.Printf("Encrypting %s\n", plainText)
	return c.cipherAlgorithm(plainText, func(a, b int) int { return a + b })
}

func (c *cipher) Decryption(cipherText string) string {
	fmt.Printf("Decrypting %s\n", cipherText)
	return c.cipherAlgorithm(cipherText, func(a, b int) int { return a - b })
}

func NewShift(shift int) Cipher {
	if shift < -25 || 25 < shift || shift == 0 {
		return nil
	}
	c := cipher([]int{shift})
	return &c
}

func NewCaesar(key int) Cipher {
	return NewShift(key)
}

func main() {
	c := NewCaesar(1)
	fmt.Println("Encrypt Key(01) abcd =>", c.Encryption("abcd"))
	fmt.Println("Decrypt Key(01) bcde =>", c.Decryption("bcde"))
	fmt.Println()

	c = NewCaesar(10)
	fmt.Println("Encrypt Key(10) abcd =>", c.Encryption("abcd"))
	fmt.Println("Decrypt Key(10) klmn =>", c.Decryption("klmn"))
	fmt.Println()

	c = NewCaesar(15)
	fmt.Println("Encrypt Key(15) abcd =>", c.Encryption("abcd"))
	fmt.Println("Decrypt Key(15) pqrs =>", c.Decryption("pqrs"))

}
