import random

def create_matrix(rows, cols):
    """Creates a matrix with random integers."""
    return [[random.randint(1, 100) for _ in range(cols)] for _ in range(rows)]

def multiply_matrices(A, B):
    """Multiplies two matrices A and B."""
    rows_A = len(A)
    cols_A = len(A[0])
    rows_B = len(B)
    cols_B = len(B[0])

    if cols_A != rows_B:
        raise ValueError("Number of columns in A must be equal to number of rows in B")

    result = [[0 for _ in range(cols_B)] for _ in range(rows_A)]

    for i in range(rows_A):
        for j in range(cols_B):
            for k in range(cols_A):
                result[i][j] += A[i][k] * B[k][j]

    return result

def print_matrix(matrix):
    """Prints the matrix in a readable format."""
    for row in matrix:
        print(row)

if __name__ == "__main__":
    print("Generating random matrices...")
    rows_A, cols_A = 3, 2
    rows_B, cols_B = 2, 3

    matrix_A = create_matrix(rows_A, cols_A)
    matrix_B = create_matrix(rows_B, cols_B)

    print("\nMatrix A:")
    print_matrix(matrix_A)

    print("\nMatrix B:")
    print_matrix(matrix_B)

    print("\nResult of A * B:")
    result_matrix = multiply_matrices(matrix_A, matrix_B)
    print_matrix(result_matrix)
