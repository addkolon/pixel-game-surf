<?php

$servername = "localhost";
$database = "gamen92_scores";
$username = "gamen92";
$password = "LpLX6KXHVQ8j";


$conn = mysqli_connect($servername, $username, $password, $database);
if (!$conn) {
  die("Connection failed: " . $conn->connect_error);
} else {
  $qu="SELECT * FROM score ORDER BY score DESC LIMIT 0, 10";
  $result = $conn->query($qu);
  $datadata = array();

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      array_push($datadata, [ 'name' => $row["name"], 'email' => $row["email"], 'score' => $row["score"] ]);
    }
} else {
  $data = [ 'success' => false, 'message' => "gick fult" ];
}

  $conn->close();
  $data = [ 'success' => true, 'message' => "ja", 'data' => $datadata ];

  header('Content-type: application/json');
  echo json_encode( $data );

   $conn->close();
}

?>