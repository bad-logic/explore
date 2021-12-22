package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"

	"log"
	"net/http"
	"os"
	"time"

	"github.com/davecgh/go-spew/spew"
	"github.com/gorilla/mux"
)

type Block struct {
	Index     int
	Timestamp string
	BPM       int
	PrevHash  string
	Hash      string
}

var Blockchain []Block

func generateHash(block Block) string {
	record := string(block.Index) + block.Timestamp + string(block.BPM) + block.PrevHash
	h := sha256.New()
	h.Write([]byte(record))
	hashed := h.Sum(nil)
	return hex.EncodeToString(hashed)
}

func generateBlock(oldBlock Block, BPM int) (Block, error) {
	var newBlock Block
	t := time.Now()
	newBlock.Index = oldBlock.Index + 1
	newBlock.Timestamp = t.String()
	newBlock.BPM = BPM
	newBlock.PrevHash = oldBlock.Hash
	newBlock.Hash = generateHash(newBlock)
	return newBlock, nil
}

func isBlockValid(oldBlock, newBlock Block) bool {
	if oldBlock.Index+1 != newBlock.Index {
		return false
	}
	if oldBlock.Hash != newBlock.PrevHash {
		return false
	}
	if newBlock.Hash != generateHash(newBlock) {
		return false
	}
	return true
}

func replaceChain(newBlocks []Block) {
	if len(newBlocks) > len(Blockchain) {
		Blockchain = newBlocks
	}
}

func makeMuxRouter() http.Handler {
	muxRouter := mux.NewRouter()
	muxRouter.HandleFunc("/", handleGetBlockchain).Methods("GET")
	muxRouter.HandleFunc("/", handleWriteBlock).Methods("POST")
	return muxRouter
}

func respondWithJSON(request *http.Request, response http.ResponseWriter, statusCode int, payload interface{}) {
	result, err := json.MarshalIndent(payload, "", " ")
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte("HTTP 500: Internal Server Error"))
		return
	}
	response.WriteHeader(statusCode)
	response.Write(result)
}

func handleGetBlockchain(response http.ResponseWriter, request *http.Request) {
	respondWithJSON(request, response, http.StatusOK, Blockchain)
}

type Message struct {
	BPM int
}

func handleWriteBlock(response http.ResponseWriter, request *http.Request) {
	var m Message
	decoder := json.NewDecoder(request.Body) // send BPM int in body of the request
	if err := decoder.Decode(&m); err != nil {
		respondWithJSON(request, response, http.StatusBadRequest, request.Body)
		return
	}

	defer request.Body.Close()
	oldBlock := Blockchain[len(Blockchain)-1]
	newBlock, err := generateBlock(oldBlock, m.BPM)
	if err != nil {
		respondWithJSON(request, response, http.StatusInternalServerError, m)
		return
	}
	if isBlockValid(oldBlock, newBlock) {
		newBlockchain := append(Blockchain, newBlock)
		replaceChain(newBlockchain)
		// spew.Dump is a convenient function that pretty prints our structs into the console. It’s useful for debugging
		spew.Dump(Blockchain)
	}
	respondWithJSON(request, response, http.StatusCreated, newBlock)

}

func runServer() error {
	handler := makeMuxRouter()
	httpAddr := os.Getenv("PORT")
	log.Println("Listening on", os.Getenv(("PORT")))
	s := &http.Server{
		Addr:           ":" + httpAddr,
		Handler:        handler,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	if err := s.ListenAndServe(); err != nil {
		return err
	}
	return nil
}

func main() {

	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("PORT not set")
	}

	go func() {
		t := time.Now()
		var genesisBlock Block
		genesisBlock.Index = 0
		genesisBlock.Timestamp = t.String()
		genesisBlock.BPM = 0
		genesisBlock.PrevHash = ""
		genesisBlock.Hash = generateHash(genesisBlock)
		spew.Dump(genesisBlock)
		Blockchain = append(Blockchain, genesisBlock)
	}()
	log.Fatal((runServer()))
}
