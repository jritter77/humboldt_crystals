<?php

session_start();

// Connect to database 
$db = new SQLite3('../../data/humboldtCrystals.db');

// sqlite3 command to be executed
$stmt = $db->prepare("UPDATE users 
    SET 
        pass = :newPass
    WHERE 
        user = :user
    ");

$req = json_decode($_POST['req']);

$hash = password_hash($req->newPass, PASSWORD_DEFAULT);

// fill in parameters
$stmt->bindValue(':newPass', $hash);
$stmt->bindValue(':user', $_SESSION['user']);



// Execute the sqlite3 command
$result = $stmt->execute();

echo json_encode($result);

?>