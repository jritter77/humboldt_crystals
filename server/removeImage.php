<?php

$imgPath = "..\images\\";

// get parameters from request
$req = json_decode($_POST['req']);

echo json_encode($req->filename);

unlink( $imgPath . $req->filename);

echo "finished!";

?>