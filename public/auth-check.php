<?php
require '../config/bootstrap.php';
require '../app/cors.php';
enableCors($ALLOWED_ORIGINS, true);
require '../app/auth.php';

//debug
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');


try {
    $user = authenticate(); // read from $_COOKIE['auth_token']
    echo json_encode([
        'authenticated' => true,
        'name' => $user->name,
        'email' => $user->email
    ]);
    
} catch (Exception $e) {
    echo json_encode(['authenticated' => false]);
}
