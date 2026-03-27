// Random Password Generator
// Generates secure random passwords

const crypto = require('crypto');

function generateRandomPassword(length = 16, options = {}) {
    const {
        includeUppercase = true,
        includeLowercase = true,
        includeNumbers = true,
        includeSymbols = true
    } = options;

    let characters = '';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) characters += '0123456789';
    if (includeSymbols) characters += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let password = '';
    const randomBytes = crypto.randomBytes(length);
    
    for (let i = 0; i < length; i++) {
        password += characters[randomBytes[i] % characters.length];
    }

    return password;
}

console.log('Random Password Generator');
console.log('='.repeat(30));
console.log();

for (let i = 1; i <= 5; i++) {
    const password = generateRandomPassword(16);
    console.log(`Password ${i}: ${password}`);
}

console.log();
console.log('Keep these passwords secure!');


