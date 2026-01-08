import std.stdio;
import std.random;
import std.datetime;

// Random code generator
string generateRandomCode(int length = 10) {
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    string code;
    code.length = length;
    
    for (int i = 0; i < length; i++) {
        code[i] = characters[uniform(0, characters.length)];
    }
    return code;
}

void main() {
    writeln("Random Code Generator");
    writeln("=".repeat(20));
    writeln();
    
    for (int i = 1; i <= 5; i++) {
        string code = generateRandomCode(12);
        writefln("Code #%d: %s", i, code);
    }
    
    auto now = Clock.currTime();
    writeln();
    writefln("Generated at: %s", now.toISOExtString());
}

