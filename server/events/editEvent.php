<?php

// Connect to database 
$db = new SQLite3('../../data/humboldtCrystals.db');

// sqlite3 command to be executed
$stmt = $db->prepare("UPDATE events 
    SET 
        title = :title,
        description = :description
    WHERE 
        id = :id
    ");

$req = json_decode($_POST['req']);

// fill in parameters
$stmt->bindValue(':id', $req->id);
$stmt->bindValue(':title', $req->title);
$stmt->bindValue(':description', $req->description);



// Execute the sqlite3 command
$result = $stmt->execute();

?>