<?php

$target_dir = '../images/';
$target_file = $target_dir . strtolower(basename($_FILES['fileToUpload']['name']));
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check is image
if (isset($_POST['submit'])) {
    $check = getimagesize($_FILES['fileToUpload']['tmp_name']);
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
    echo 'File already exists, and will be linked to this item.';
}

// Check file size
if ($_FILES["fileToUpload"]["size"] > 10000000) {
    $uploadOk = 0;
    echo 'File to large!';
  }

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  $uploadOk = 0;
  echo 'Only .jpg, .png, .jpeg, and .gif files are supported!';
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 1) {
  
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
      echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";
    } else {
      echo "Sorry, there was an error uploading your file.";
    }
  }

?>