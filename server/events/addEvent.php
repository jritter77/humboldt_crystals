<?php

// Connect to database 
$db = new SQLite3('../../data/humboldtCrystals.db');

// sqlite3 command to be executed
$stmt = $db->prepare("INSERT INTO events (
        title,
        month,
        day,
        year,
        description,
        images
    )
    VALUES (
        :title,
        :month,
        :day,
        :year,
        :description,
        :images
    )");

$req = json_decode($_POST['req']);

// fill in parameters
$stmt->bindValue(':title', $req->title);
$stmt->bindValue(':month', $req->month);
$stmt->bindValue(':day', $req->day);
$stmt->bindValue(':year', $req->year);
$stmt->bindValue(':description', $req->description);
$stmt->bindValue(':images', $req->images);



// Execute the sqlite3 command
$result = $stmt->execute();

?>