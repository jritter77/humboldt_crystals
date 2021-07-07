<?php

    // start/resume session
    session_start();
    
    // get req params
    $req = json_decode($_POST['req']);
    
    $user = $req->user;
    $session = $req->session;

    if ($user == $_SESSION['user']) {
        session_regenerate_id();
        $token = array();
        $token['user'] = $user;
        $token['session'] = session_id();
        echo json_encode($token);
    }
    else{
        echo FALSE;
    }

?>