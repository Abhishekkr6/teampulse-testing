import random

def random_greeting():
    greetings = ["Hello", "Hi", "Greetings", "Salutations", "Welcome"]
    places = ["World", "Universe", "Galaxy", "Dimension", "Void"]
    
    print(f"{random.choice(greetings)}, {random.choice(places)}!")

def random_math():
    a = random.randint(1, 100)
    b = random.randint(1, 100)
    print(f"Random math: {a} * {b} = {a * b}")

if __name__ == "__main__":
    random_greeting()
    random_math()
