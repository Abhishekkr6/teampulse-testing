#include <iostream>
#include <string>
#include <random>
#include <ctime>
#include <iomanip>
#include <sstream>

// Random code generator
std::string generateRandomCode(int length = 10) {
    const std::string characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis(0, characters.length() - 1);
    
    std::string code;
    for (int i = 0; i < length; i++) {
        code += characters[dis(gen)];
    }
    return code;
}

int main() {
    std::cout << "Random Code Generator" << std::endl;
    std::cout << "====================" << std::endl;
    std::cout << std::endl;
    
    for (int i = 1; i <= 5; i++) {
        std::string code = generateRandomCode(12);
        std::cout << "Code #" << i << ": " << code << std::endl;
    }
    
    auto now = std::time(nullptr);
    auto tm = *std::localtime(&now);
    std::ostringstream oss;
    oss << std::put_time(&tm, "%Y-%m-%d %H:%M:%S");
    std::cout << "\nGenerated at: " << oss.str() << std::endl;
    
    return 0;
}

