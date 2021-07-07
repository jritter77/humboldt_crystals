<?php

// Connect to database 
$db = new SQLite3('../../data/humboldtCrystals.db');

// sqlite3 command to be executed
$stmt = $db->prepare("INSERT INTO events (
        title,
        month,
        day,
        year,
        description
    )
    VALUES (
        :title,
        :month,
        :day,
        :year,
        :description
    )");

$req = json_decode($_POST['req']);

// fill in parameters
$stmt->bindValue(':title', $req->title);
$stmt->bindValue(':month', $req->month);
$stmt->bindValue(':day', $req->day);
$stmt->bindValue(':year', $req->year);
$stmt->bindValue(':description', $req->description);



// Execute the sqlite3 command
$result = $stmt->execute();

?>