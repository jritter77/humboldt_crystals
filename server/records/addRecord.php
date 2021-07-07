<?php

// Connect to database 
$db = new SQLite3('../../data/humboldtCrystals.db');

// sqlite3 command to be executed
$stmt = $db->prepare("INSERT INTO catalog (
        title,
        description,
        price,
        img,
        tags
    )
    VALUES (
        :title,
        :description,
        :price,
        :img,
        :tags
    )");

$req = json_decode($_POST['req']);

// fill in parameters
$stmt->bindValue(':title', $req->title);
$stmt->bindValue(':description', $req->description);
$stmt->bindValue(':price', $req->price);
$stmt->bindValue(':img', $req->img);
$stmt->bindValue(':tags', $req->tags);


// Execute the sqlite3 command
$result = $stmt->execute();

?>