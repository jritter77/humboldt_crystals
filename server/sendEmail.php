<?php

$req = json_decode($_POST['req']);

$to = 'jakeritter77@gmail.com';
$sub = $req->sub;
$msg = $req->msg;
$headers = 'From: ' . $req->from;

$result = mail($to, $sub, $msg, $headers);

echo $result;

?>