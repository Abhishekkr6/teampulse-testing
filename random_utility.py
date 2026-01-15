"""
Random Utility Functions
A collection of useful utility functions for common tasks.
"""

import random
import string
from typing import List, Dict, Any
from datetime import datetime, timedelta


def generate_random_string(length: int = 10, use_digits: bool = True, use_special: bool = False) -> str:
    """
    Generate a random string of specified length.
    
    Args:
        length: Length of the string to generate
        use_digits: Include digits in the string
        use_special: Include special characters
        
    Returns:
        A random string
    """
    chars = string.ascii_letters
    if use_digits:
        chars += string.digits
    if use_special:
        chars += string.punctuation
    
    return ''.join(random.choice(chars) for _ in range(length))


def shuffle_list(items: List[Any]) -> List[Any]:
    """Shuffle a list and return a new list."""
    shuffled = items.copy()
    random.shuffle(shuffled)
    return shuffled


def pick_random_items(items: List[Any], count: int = 1) -> List[Any]:
    """Pick random items from a list without replacement."""
    return random.sample(items, min(count, len(items)))


def calculate_stats(numbers: List[float]) -> Dict[str, float]:
    """
    Calculate basic statistics for a list of numbers.
    
    Returns a dictionary with mean, median, min, max, and sum.
    """
    if not numbers:
        return {}
    
    sorted_nums = sorted(numbers)
    n = len(numbers)
    
    return {
        'mean': sum(numbers) / n,
        'median': sorted_nums[n // 2] if n % 2 else (sorted_nums[n // 2 - 1] + sorted_nums[n // 2]) / 2,
        'min': min(numbers),
        'max': max(numbers),
        'sum': sum(numbers),
        'count': n
    }


def generate_dates(start_date: str, days: int = 7) -> List[str]:
    """
    Generate a list of dates starting from start_date.
    
    Args:
        start_date: Date in format YYYY-MM-DD
        days: Number of days to generate
        
    Returns:
        List of date strings
    """
    date = datetime.strptime(start_date, '%Y-%m-%d')
    return [
        (date + timedelta(days=i)).strftime('%Y-%m-%d')
        for i in range(days)
    ]


if __name__ == '__main__':
    # Example usage
    print("Random String:", generate_random_string(15))
    print("Random Items:", pick_random_items(['apple', 'banana', 'cherry', 'date'], 2))
    print("Stats:", calculate_stats([10, 20, 30, 40, 50]))
    print("Dates:", generate_dates('2026-01-15', 5))
