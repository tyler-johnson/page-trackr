BIN = ./node_modules/.bin
SRC = $(wildcard src/* src/*/*)

build: index.js

index.js: src/index.js $(SRC)
	$(BIN)/rollup $< -c > $@

test: test/index.js
	$(BIN)/rollup $< -c -m inline | $(BIN)/browserify - --debug | $(BIN)/tape-run

clean:
	rm -rf index.js

.PHONY: build clean test
