<?php
require '../config/bootstrap.php';
require '../app/auth.php';
require '../app/Models/UserToken.php';

header('Content-Type: application/json');

$user = authenticate(); // Authenticated user from token

// Extract token from Authorization header
$headers = getallheaders();
preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches);
$token = $matches[1];

// Delete token from DB
UserToken::where('user_id', $user->id)
         ->where('token', $token)
         ->delete();

echo json_encode(['message' => 'Logout erfolgreich']);
