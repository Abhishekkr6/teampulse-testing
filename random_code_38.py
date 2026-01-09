import random
import time


def random_bar(length: int = 20) -> str:
    """Return a bar made of random blocks."""
    blocks = "░▒▓█"
    return "".join(random.choice(blocks) for _ in range(length))


def main() -> None:
    print("Random Loading Bars")
    print("===================\n")

    for i in range(5):
        pct = (i + 1) * 20
        bar = random_bar()
        print(f"{pct:3d}% {bar}")
        time.sleep(0.2)

    print("\nDone.")


if __name__ == "__main__":
    main()


