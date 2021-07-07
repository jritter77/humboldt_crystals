<?php
// Connect to database
$db = new SQLite3('../../data/humboldtCrystals.db');

// get all posts
$results = $db->query("SELECT * FROM events");

// store results in array
$myArr = array(); 
while ($row = $results->fetchArray()) {
  array_push($myArr, $row);
}

// echo results array
echo json_encode($myArr);

?>