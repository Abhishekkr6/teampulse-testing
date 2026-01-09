using System;
using System.Security.Cryptography;
using System.Text;

class RandomCode7
{
    static string RandomPhrase(int words = 4)
    {
        string[] pool = {
            "solar", "binary", "nebula", "quantum", "flux",
            "matrix", "vector", "delta", "omega", "lambda",
            "pixel", "cosmic", "fusion", "orbit", "signal"
        };

        var rnd = RandomNumberGenerator.Create();
        var bytes = new byte[4];
        var sb = new StringBuilder();

        for (int i = 0; i < words; i++)
        {
            rnd.GetBytes(bytes);
            int idx = BitConverter.ToInt32(bytes, 0);
            if (idx < 0) idx = -idx;
            idx %= pool.Length;

            if (i > 0) sb.Append('-');
            sb.Append(pool[idx]);
        }

        return sb.ToString();
    }

    static void Main()
    {
        Console.WriteLine("Session id : " + Guid.NewGuid());
        Console.WriteLine("Code phrase: " + RandomPhrase());
    }
}




