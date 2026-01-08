# Random code generator
defmodule RandomCode18 do
  def generate_random_code(length \\ 10) do
    characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    characters
    |> String.graphemes()
    |> Enum.take_random(length)
    |> Enum.join()
  end

  def run do
    IO.puts("Random Code Generator")
    IO.puts(String.duplicate("=", 20))
    IO.puts("")

    Enum.each(1..5, fn i ->
      code = generate_random_code(12)
      IO.puts("Code ##{i}: #{code}")
    end)

    timestamp = DateTime.utc_now() |> DateTime.to_string() |> String.slice(0, 19) |> String.replace("T", " ")
    IO.puts("\nGenerated at: #{timestamp}")
  end
end

RandomCode18.run()

