' Random Code Generator in VBScript
' Generates random alphanumeric codes

Function GenerateRandomCode(length)
    Dim characters, code, i, randomIndex
    characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    code = ""
    
    Randomize
    For i = 1 To length
        randomIndex = Int(Rnd() * Len(characters)) + 1
        code = code & Mid(characters, randomIndex, 1)
    Next
    
    GenerateRandomCode = code
End Function

' Main execution
WScript.Echo "Random Code Generator"
WScript.Echo String(20, "=")
WScript.Echo ""

Dim i, code
For i = 1 To 5
    code = GenerateRandomCode(12)
    WScript.Echo "Code #" & i & ": " & code
Next

Dim timestamp
timestamp = Now()
WScript.Echo ""
WScript.Echo "Generated at: " & FormatDateTime(timestamp, 0)


