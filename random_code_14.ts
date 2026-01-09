// Random code generator
function generateRandomCode(length: number = 10): string {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

console.log('Random Code Generator');
console.log('='.repeat(20));
console.log();

for (let i = 1; i <= 5; i++) {
    const code = generateRandomCode(12);
    console.log(`Code #${i}: ${code}`);
}

const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
console.log(`\nGenerated at: ${timestamp}`);



