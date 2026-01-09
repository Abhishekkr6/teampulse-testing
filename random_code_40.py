import random


WORDS = ["python", "random", "window", "cursor", "rocket", "galaxy", "neuron"]


def mask(word: str, revealed: set[str]) -> str:
    return "".join(ch if ch in revealed else "_" for ch in word)


def main() -> None:
    secret = random.choice(WORDS)
    revealed: set[str] = set()
    lives = 6

    print("Mini Word Guess")
    print("==============\n")

    while lives > 0 and not set(secret) <= revealed:
        print("Word:", mask(secret, revealed))
        print("Lives:", lives)
        guess = input("Letter: ").strip().lower()[:1]
        if not guess:
            continue
        if guess in revealed:
            print("Already tried that.\n")
            continue
        if guess in secret:
            revealed.add(guess)
            print("Nice!\n")
        else:
            lives -= 1
            print("Nope.\n")

    if set(secret) <= revealed:
        print("You win! The word was:", secret)
    else:
        print("Out of lives. The word was:", secret)


if __name__ == "__main__":
    main()


