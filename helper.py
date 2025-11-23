import random
from typing import List


def roll_dice(times: int = 3, sides: int = 6) -> List[int]:
    """Return a list of pseudo-random dice rolls."""
    results = []
    for _ in range(max(0, times)):
        results.append(random.randint(1, max(2, sides)))
    return results


if __name__ == "__main__":
    for idx, value in enumerate(roll_dice(), start=1):
        print(f"Roll {idx}: {value}")
