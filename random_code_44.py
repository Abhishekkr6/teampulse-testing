#!/usr/bin/env python3
"""
Random Data Generator
Generates random data for testing purposes
"""

import random
import string
from datetime import datetime, timedelta

def generate_random_email():
    """Generate a random email address"""
    domains = ['example.com', 'test.com', 'demo.org', 'sample.net', 'random.io']
    username = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
    domain = random.choice(domains)
    return f"{username}@{domain}"

def generate_random_date(start_year=2020):
    """Generate a random date"""
    start = datetime(start_year, 1, 1)
    end = datetime.now()
    time_between = end - start
    days_between = time_between.days
    random_days = random.randrange(days_between)
    return start + timedelta(days=random_days)

def generate_random_name():
    """Generate a random name"""
    first_names = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Morgan', 'Avery', 'Quinn']
    last_names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis']
    return f"{random.choice(first_names)} {random.choice(last_names)}"

print("Random Data Generator")
print("=" * 40)
print()

for i in range(1, 6):
    name = generate_random_name()
    email = generate_random_email()
    date = generate_random_date().strftime("%Y-%m-%d")
    print(f"Record {i}:")
    print(f"  Name: {name}")
    print(f"  Email: {email}")
    print(f"  Date: {date}")
    print()

print("Generated at:", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))


