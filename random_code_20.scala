import scala.util.Random
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

// Random code generator
object RandomCode20 {
  def generateRandomCode(length: Int = 10): String = {
    val characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    (1 to length).map(_ => characters(Random.nextInt(characters.length))).mkString
  }
  
  def main(args: Array[String]): Unit = {
    println("Random Code Generator")
    println("=" * 20)
    println()
    
    for (i <- 1 to 5) {
      val code = generateRandomCode(12)
      println(s"Code #$i: $code")
    }
    
    val timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
    println(s"\nGenerated at: $timestamp")
  }
}


