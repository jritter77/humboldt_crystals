<?php
// Connect to database 
$db = new SQLite3('../../data/humboldtCrystals.db');

$req = json_decode($_POST['req']);

// sqlite3 command to be executed
$stmt = $db->prepare("SELECT * FROM catalog WHERE id = :id");

// fill in parameters
$stmt->bindValue(':id', $req->id);

// Execute the sqlite3 command
$result = $stmt->execute();

$myArr = array(); 
while ($row = $result->fetchArray()) {
  array_push($myArr, $row);
}

echo json_encode($myArr);

?>