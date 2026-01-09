import kotlin.random.Random

// Random code generator
fun generateRandomCode(length: Int = 10): String {
    val characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return (1..length)
        .map { characters[Random.nextInt(characters.length)] }
        .joinToString("")
}

fun main() {
    println("Random Code Generator")
    println("=".repeat(20))
    println()
    
    for (i in 1..5) {
        val code = generateRandomCode(12)
        println("Code #$i: $code")
    }
    
    val timestamp = java.time.LocalDateTime.now()
        .format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
    println("\nGenerated at: $timestamp")
}



