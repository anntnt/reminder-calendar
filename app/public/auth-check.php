<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__ . '/../config/bootstrap.php';
require '../auth.php';

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
