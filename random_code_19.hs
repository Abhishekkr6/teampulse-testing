import System.Random
import Data.Time
import Data.Time.Format

-- Random code generator
generateRandomCode :: Int -> IO String
generateRandomCode length = do
    let characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    indices <- sequence $ replicate length (randomRIO (0, length characters - 1))
    return $ map (characters !!) indices

main :: IO ()
main = do
    putStrLn "Random Code Generator"
    putStrLn (replicate 20 '=')
    putStrLn ""
    
    codes <- sequence $ replicate 5 (generateRandomCode 12)
    mapM_ (\(i, code) -> putStrLn $ "Code #" ++ show i ++ ": " ++ code) $ zip [1..] codes
    
    now <- getCurrentTime
    let timestamp = formatTime defaultTimeLocale "%Y-%m-%d %H:%M:%S" now
    putStrLn $ "\nGenerated at: " ++ timestamp

