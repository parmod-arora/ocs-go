FROM golang:1.12
ENV GO111MODULE=on

RUN apt-get -qq update \
  && apt-get install -y \
    libleptonica-dev \
    libtesseract-dev \
    tesseract-ocr

# Load languages
RUN apt-get install -y \
  tesseract-ocr-jpn

ADD . $GOPATH/ocrserver
WORKDIR $GOPATH/ocrserver
RUN go get ./...
RUN go test -v github.com/otiai10/gosseract

ENV PORT=8080
CMD $GOPATH/bin/ocrserver
