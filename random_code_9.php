<?php
// Random code generator
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

echo "Random Code Generator\n";
echo "====================\n\n";

for ($i = 1; $i <= 5; $i++) {
    $code = generateRandomString(12);
    echo "Code #$i: $code\n";
}

$timestamp = date('Y-m-d H:i:s');
echo "\nGenerated at: $timestamp\n";
?>

