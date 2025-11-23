const alphabet = "abcdefghijklmnopqrstuvwxyz";

function scramble(seed = Date.now()) {
    let value = seed.toString().split("").reduce((acc, digit) => acc + Number(digit), 0);
    let output = "";

    while (output.length < 12) {
        value = (value * 73 + 19) % 397;
        output += alphabet[value % alphabet.length];
    }

    return output;
}

if (require.main === module) {
    console.log(scramble());
}

module.exports = { scramble };
