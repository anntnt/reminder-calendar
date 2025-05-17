<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require '../app/cors.php';
enableCors('http://localhost:3000', true);

require '../config/bootstrap.php';
require '../app/Models/User.php';

header('Content-Type: application/json');

// Read and log JSON input
$data = json_decode(file_get_contents('php://input'), true);
//file_put_contents(__DIR__ . '/../log.txt', print_r($data, true), FILE_APPEND);

// Validate input
if (!$data || !isset($data['name'], $data['email'], $data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, email, and password are required']);
    exit;
}

// Check for existing email
if (User::where('email', $data['email'])->exists()) {
    http_response_code(409);
    echo json_encode(['error' => 'Email already registered']);
    exit;
}

// Create user
$user = User::create([
    'name'          => $data['name'],
    'email'         => $data['email'],
    'password_hash' => password_hash($data['password'], PASSWORD_DEFAULT),
]);

// Respond with success
http_response_code(201);
echo json_encode([
    'message' => 'User registered successfully',
    'user_id' => $user->id,
]);
