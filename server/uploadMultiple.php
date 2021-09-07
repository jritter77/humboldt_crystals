<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$target_dir = '../images/';

$fileCount = count($_FILES['fileToUpload']['name']);


for ($i = 0; $i < $fileCount; $i++) {
    $target_file = $target_dir . basename($_FILES['fileToUpload']['name'][$i]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check is image
    if (isset($_POST['submit'])) {
        $check = getimagesize($_FILES['fileToUpload']['tmp_name'][$i]);
        if ($check !== false) {
            $uploadOk = 1;
        }
        else {
            $uploadOk = 0;
        }
    }

    // Check if file exists
    if (file_exists($target_file)) {
        $uploadOk = 0;
        echo 'File already exists, and will be linked to this item.<br>';
    }

    // Check file size
    if ($_FILES["fileToUpload"]["size"][$i] > 10000000) {
        $uploadOk = 0;
        echo 'File to large!';
    }

    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
    $uploadOk = 0;
    echo 'Only .jpg, .png, .jpeg, and .gif files are supported!<br>';
    }


    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"][$i], $target_file)) {
        echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"][$i])) . " has been uploaded.<br>";
        } else {
        echo "butts mcbutts";
        }
    }
}

?>