<?php
use App\Models\User;
require '../config/bootstrap.php';
require '../app/Models/User.php';
require '../app/Models/UserToken.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email'], $data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password are required']);
    exit;
}

$user = User::where('email', $data['email'])->first();

if (!$user || !password_verify($data['password'], $user->password_hash)) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
    exit;
}

// Generate token
$token = bin2hex(random_bytes(32));

// Save token
$token = bin2hex(random_bytes(32));

UserToken::create([
    'user_id'    => $user->id,
    'token'      => $token,
    'expires_at' => date('Y-m-d H:i:s', strtotime('+1 hour')), // expires in 1 hour
]);

echo json_encode([
    'message' => 'Login successful',
    'token'   => $token,
    'user_id' => $user->id,
]);
