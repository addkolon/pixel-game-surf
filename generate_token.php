<?php
// $secretKey = 'matteitaliano';

// function generateJwt()
// {
//     global $secretKey;

//     $header = json_encode([
//         'typ' => 'JWT',
//         'alg' => 'HS256'
//     ]);

// $payload = json_encode([
//     'iat' => time(),
//     'exp' => time() + (60 * 15) // Expires in 15 minutes
// ]);

//     $base64UrlHeader = base64UrlEncode($header);
//     $base64UrlPayload = base64UrlEncode($payload);
//     $signature = hash_hmac('sha256', $base64UrlHeader . '.' . $base64UrlPayload, $secretKey, true);
//     $base64UrlSignature = base64UrlEncode($signature);

//     return $base64UrlHeader . '.' . $base64UrlPayload . '.' . $base64UrlSignature;
// }


// function base64UrlEncode($data)
// {
//     $base64 = base64_encode($data);
//     $base64Url = strtr($base64, '+/', '-_');
//     return rtrim($base64Url, '=');
// }


// function getToken()
// {
//     $jwt = generateJwt();

//     header('Content-Type: application/json');
//     echo json_encode(['token' => $jwt]);
// }


// getToken();
function generateJWT($secretKey)
{
    // Set the header
    $header = [
        'alg' => 'HS256',
        'typ' => 'JWT'
    ];
    $encodedHeader = base64_encode(json_encode($header));

    // Set the payload
    $payload = [
        'sub' => '1234567890',
        'name' => 'John Doe',
        'iat' => time()
    ];
    $encodedPayload = base64_encode(json_encode($payload));

    // Generate the signature
    $signature = hash_hmac('sha256', $encodedHeader . '.' . $encodedPayload, $secretKey, true);
    $encodedSignature = base64_encode($signature);

    // Combine the header, payload, and signature
    $jwt = $encodedHeader . '.' . $encodedPayload . '.' . $encodedSignature;

    return $jwt;
}
$secretKey = 'matteitaliano';

$jwt = generateJWT($secretKey);
echo json_encode(['token' => $jwt]);

?>