# Random Code Generator Makefile
# Build and run various random code generators

.PHONY: all clean run-js run-py run-go run-cpp help

# Default target
all: help

# JavaScript
run-js:
	@echo "Running JavaScript random code generator..."
	node random_code_1.js

# Python
run-py:
	@echo "Running Python random code generator..."
	python random_code_2.py

# Go
run-go:
	@echo "Running Go random code generator..."
	go run random_code_4.go

# C++
build-cpp:
	@echo "Building C++ random code generator..."
	g++ random_code_13.cpp -o random_code_13

run-cpp: build-cpp
	@echo "Running C++ random code generator..."
	./random_code_13

# Run all generators
run-all: run-js run-py run-go
	@echo "All generators completed!"

# Clean compiled files
clean:
	@echo "Cleaning compiled files..."
	rm -f random_code_13 random_code_13.exe
	rm -f *.o *.exe

# Help
help:
	@echo "Random Code Generator Makefile"
	@echo "Available targets:"
	@echo "  run-js     - Run JavaScript generator"
	@echo "  run-py     - Run Python generator"
	@echo "  run-go     - Run Go generator"
	@echo "  build-cpp  - Build C++ generator"
	@echo "  run-cpp    - Build and run C++ generator"
	@echo "  run-all    - Run all generators"
	@echo "  clean      - Remove compiled files"
	@echo "  help       - Show this help message"

