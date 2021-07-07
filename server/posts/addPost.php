<?php

// Connect to database 
$db = new SQLite3('../../data/humboldtCrystals.db');

// sqlite3 command to be executed
$stmt = $db->prepare("INSERT INTO posts (
        date,
        title,
        description
    )
    VALUES (
        :date,
        :title,
        :description
    )");

$req = json_decode($_POST['req']);

// fill in parameters
$stmt->bindValue(':date', $req->date);
$stmt->bindValue(':title', $req->title);
$stmt->bindValue(':description', $req->description);



// Execute the sqlite3 command
$result = $stmt->execute();

?>