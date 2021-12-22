FROM golang:1.12.0-alpine3.9
# Set necessary environmet variables needed for our image
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# install git to add deps from git repos
RUN apk add git
RUN go get github.com/davecgh/go-spew
RUN go get github.com/gorilla/mux

# set your working directory
WORKDIR /usr/app

# create src directory inside workdir /usr/app
RUN mkdir /usr/app/src

# copy source code
COPY ./src ./src

## Our project will now successfully build with the necessary go libraries included.
RUN go build src/server.go

## execute newly created binary executable
CMD ["./server"]