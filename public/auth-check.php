<?php
require '../app/cors.php';
enableCors('http://localhost:3000', true);

require '../config/bootstrap.php';
require '../app/auth.php';


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


header('Content-Type: application/json');


try {
    $user = authenticate(); // read from $_COOKIE['auth_token']
    echo json_encode(['authenticated' => true, 'user_id' => $user->id]);
} catch (Exception $e) {
    echo json_encode(['authenticated' => false]);
}
