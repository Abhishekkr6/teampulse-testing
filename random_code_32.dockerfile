# Random Code Generator Dockerfile
# Multi-stage build for a random code generator application

FROM python:3.11-slim as builder

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY random_code_2.py .

FROM python:3.11-slim

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /app/random_code_2.py .

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV CODE_LENGTH=12
ENV NUM_CODES=5

# Run the random code generator
CMD ["python", "random_code_2.py"]

# Metadata
LABEL maintainer="Random Code Generator"
LABEL description="Docker container for random code generation"
LABEL version="1.0.0"

