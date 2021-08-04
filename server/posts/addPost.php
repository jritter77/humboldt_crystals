<?php

// Connect to database 
$db = new SQLite3('../../data/humboldtCrystals.db');

// sqlite3 command to be executed
$stmt = $db->prepare("INSERT INTO posts (
        date,
        title,
        description,
        images
    )
    VALUES (
        :date,
        :title,
        :description,
        :images
    )");

$req = json_decode($_POST['req']);

// fill in parameters
$stmt->bindValue(':date', $req->date);
$stmt->bindValue(':title', $req->title);
$stmt->bindValue(':description', $req->description);
$stmt->bindValue(':images', $req->images);



// Execute the sqlite3 command
$result = $stmt->execute();

?>