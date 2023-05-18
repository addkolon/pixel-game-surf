<?php

$servername = "localhost";
$database = "gamen92_scores";
$username = "gamen92";
$password = "LpLX6KXHVQ8j";


$conn = mysqli_connect($servername, $username, $password, $database);
if (!$conn) {
   die("Connection failed: " . $conn->connect_error);
} else {

   try {
      $headers = apache_request_headers();
      $jwt = isset($headers['Token']) ? $headers['Token'] : '';

      $secretKey = 'matteitaliano';

      function verifyJWT($jwt, $secretKey)
      {
         // Split the JWT into its parts
         $jwtParts = explode('.', $jwt);
         if (count($jwtParts) === 3) {
            // Decode the provided signature from the JWT parts
            $providedSignature = base64_decode($jwtParts[2]);

            // Generate the signature using the secret key and the header+payload
            $generatedSignature = hash_hmac('sha256', $jwtParts[0] . '.' . $jwtParts[1], $secretKey, true);

            // Compare the generated signature with the provided signature
            if (hash_equals($generatedSignature, $providedSignature)) {
               // JWT signature is valid
               return true;
            }
         }

         // JWT signature is invalid
         return false;
      }



      $isVerified = verifyJWT($jwt, $secretKey);
      if ($isVerified) {
         $post = json_decode(file_get_contents('php://input'), true);
         $name = $post['name'];
         $email = $post['email'];
         $score = $post['score'];

         $qu = sprintf(
            "INSERT INTO score (name, email, score) VALUES ('%s', '%s', '%u')",
            $conn->real_escape_string($name),
            $conn->real_escape_string($email),
            $conn->real_escape_string($score)
         );

         $conn->query($qu);

         $datadata = array();

         if ($conn->query($qu) === TRUE) {
            array_push($datadata, ['name' => "$name", 'email' => "$email", 'score' => "$score"]);
            $data = ['success' => true, 'message' => "yup", 'data' => $datadata];
         } else {
            $data = ['success' => false, 'message' => "nope"];
         }

         header('Content-type: application/json');
         echo json_encode($data);
      } else {
         echo "JWT signature is invalid";
      }





   } catch (Exception $e) {
      echo $e;
   }
}

?>