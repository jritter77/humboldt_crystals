<?php

// Connect to database 
$db = new SQLite3('../../data/humboldtCrystals.db');

// get request object that hold req parameters
$req = json_decode($_POST['req']);

// sqlite3 command to be executed
$stmt = $db->prepare("DELETE FROM catalog WHERE id = :id");

// fill in parameters
$stmt->bindValue(':id', $req->id);

// Execute the sqlite3 command
$result = $stmt->execute();

?>