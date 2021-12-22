FROM golang:1.12.0-alpine3.9
# Set necessary environmet variables needed for our image
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# install git to add deps from git repos
RUN apk add git

# set your working directory
WORKDIR /usr/app

# copy files go.mod and go.sum
COPY go.mod .
COPY go.sum .
# Add this go mod download command to pull in any dependencies
RUN go mod download

# create src directory inside workdir /usr/app
RUN mkdir /usr/app/src

# copy source code
COPY ./src ./src

## Our project will now successfully build with the necessary go libraries included.
RUN go build -o src/server .

## execute newly created binary executable
CMD ["./server"]