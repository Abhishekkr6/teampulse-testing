-- Random code generator
function generateRandomCode(length)
    length = length or 10
    local characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    local code = ""
    for i = 1, length do
        local randomIndex = math.random(1, #characters)
        code = code .. string.sub(characters, randomIndex, randomIndex)
    end
    return code
end

math.randomseed(os.time())

print("Random Code Generator")
print(string.rep("=", 20))
print()

for i = 1, 5 do
    local code = generateRandomCode(12)
    print("Code #" .. i .. ": " .. code)
end

local timestamp = os.date("%Y-%m-%d %H:%M:%S")
print("\nGenerated at: " .. timestamp)


