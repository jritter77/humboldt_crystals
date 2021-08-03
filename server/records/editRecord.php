<?php

// Connect to database 
$db = new SQLite3('../../data/humboldtCrystals.db');

// sqlite3 command to be executed
$stmt = $db->prepare("UPDATE catalog 
    SET 
        title = :title,
        description = :description,
        price = :price,
        img = :img,
        opt = :opt,
        tags = :tags
    WHERE 
        id = :id
    ");

$req = json_decode($_POST['req']);

// fill in parameters
$stmt->bindValue(':id', $req->id);
$stmt->bindValue(':title', $req->title);
$stmt->bindValue(':description', $req->description);
$stmt->bindValue(':price', $req->price);
$stmt->bindValue(':img', $req->img);
$stmt->bindValue(':opt', $req->opt);
$stmt->bindValue(':tags', $req->tags);



// Execute the sqlite3 command
$result = $stmt->execute();

?>