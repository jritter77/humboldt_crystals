<?php

// Connect to database 
$db = new SQLite3('../../data/humboldtCrystals.db');

// sqlite3 command to be executed
$stmt = $db->prepare("SELECT pass FROM users WHERE user = :user");

// get req params
$req = json_decode($_POST['req']);


// fill in parameters
$stmt->bindValue(':user', $req->user);


// Execute the sqlite3 command
$result = $stmt->execute();


// store results in data array
$data = array();
while ($res = $result->fetchArray(SQLITE3_ASSOC)) {
    array_push($data, $res);
}


// start session and return session id if credentials are verified
if (password_verify($req->pass, $data[0]['pass'])) {
    session_start();
    $token = array();
    $_SESSION['user'] = $req->user;
    $token['user'] = $req->user;
    $token['session'] = session_id();
    echo json_encode($token);
}


  




?>