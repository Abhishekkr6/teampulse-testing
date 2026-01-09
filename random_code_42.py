#!/usr/bin/env python3
"""
Random Color Palette Generator
Generates beautiful random color palettes
"""

import random
import colorsys

def generate_random_color():
    """Generate a random RGB color"""
    return (
        random.randint(0, 255),
        random.randint(0, 255),
        random.randint(0, 255)
    )

def generate_harmonious_palette(n=5):
    """Generate a harmonious color palette"""
    base_hue = random.random()
    saturation = 0.7 + random.random() * 0.3
    lightness = 0.5 + random.random() * 0.3
    
    palette = []
    for i in range(n):
        hue = (base_hue + i * 0.2) % 1.0
        rgb = colorsys.hls_to_rgb(hue, lightness, saturation)
        palette.append(tuple(int(c * 255) for c in rgb))
    
    return palette

def rgb_to_hex(rgb):
    """Convert RGB tuple to hex string"""
    return f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"

print("Random Color Palette Generator")
print("=" * 40)
print()

# Generate random palette
palette = generate_harmonious_palette(5)

for i, color in enumerate(palette, 1):
    hex_color = rgb_to_hex(color)
    print(f"Color {i}: RGB{color} = {hex_color}")

print()
print("Copy these hex codes to use in your designs!")

