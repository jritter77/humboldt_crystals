<?php

// get parameters from request
$req = json_decode($_POST['req']);

// Save file to server with given filename
file_put_contents("../images/" . $req->save_as, file_get_contents($req->url));

echo "success";

?>