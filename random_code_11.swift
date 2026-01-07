import Foundation

// Random code generator
func generateRandomCode(length: Int = 10) -> String {
    let characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return String((0..<length).map { _ in characters.randomElement()! })
}

print("Random Code Generator")
print(String(repeating: "=", count: 20))
print()

for i in 1...5 {
    let code = generateRandomCode(length: 12)
    print("Code #\(i): \(code)")
}

let formatter = DateFormatter()
formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
let timestamp = formatter.string(from: Date())
print("\nGenerated at: \(timestamp)")

