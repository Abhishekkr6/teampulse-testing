# Random code generator
def generate_random_code(length = 10)
  chars = ('0'..'9').to_a + ('a'..'z').to_a + ('A'..'Z').to_a
  (0...length).map { chars[rand(chars.length)] }.join
end

puts "Random Code Generator"
puts "=" * 20
puts

5.times do |i|
  code = generate_random_code(12)
  puts "Code ##{i + 1}: #{code}"
end

timestamp = Time.now.strftime("%Y-%m-%d %H:%M:%S")
puts "\nGenerated at: #{timestamp}"

