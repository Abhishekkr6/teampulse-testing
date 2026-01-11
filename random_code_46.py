#!/usr/bin/env python3
"""
Random Math Quiz Generator
Generates random math problems for practice
"""

import random
import operator

def generate_math_problem():
    """Generate a random math problem"""
    operations = {
        '+': operator.add,
        '-': operator.sub,
        '*': operator.mul
    }
    
    op_symbol = random.choice(list(operations.keys()))
    op_func = operations[op_symbol]
    
    if op_symbol == '*':
        a = random.randint(1, 12)
        b = random.randint(1, 12)
    elif op_symbol == '-':
        a = random.randint(10, 100)
        b = random.randint(1, a)
    else:
        a = random.randint(1, 100)
        b = random.randint(1, 100)
    
    answer = op_func(a, b)
    return a, op_symbol, b, answer

print("Random Math Quiz Generator")
print("=" * 40)
print()

correct = 0
total = 5

for i in range(1, total + 1):
    a, op, b, answer = generate_math_problem()
    user_answer = input(f"Problem {i}: {a} {op} {b} = ")
    
    try:
        if int(user_answer) == answer:
            print("✓ Correct!\n")
            correct += 1
        else:
            print(f"✗ Wrong! The correct answer is {answer}\n")
    except ValueError:
        print(f"✗ Invalid input! The correct answer is {answer}\n")

print("=" * 40)
print(f"Score: {correct}/{total} ({correct * 100 // total}%)")
print()

if correct == total:
    print("Perfect score! 🎉")
elif correct >= total * 0.8:
    print("Great job! 👏")
elif correct >= total * 0.6:
    print("Good effort! 👍")
else:
    print("Keep practicing! 💪")

