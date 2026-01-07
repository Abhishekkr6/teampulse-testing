import random
import string


def random_token(length=12):
    alphabet = string.ascii_letters + string.digits
    return "".join(random.choice(alphabet) for _ in range(length))


def main():
    tokens = [random_token() for _ in range(5)]
    for i, token in enumerate(tokens, start=1):
        print(f"Token {i}: {token}")


if __name__ == "__main__":
    main()


