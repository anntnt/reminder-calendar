<?php
require '../config/bootstrap.php';
require '../app/cors.php';
enableCors($ALLOWED_ORIGINS, true);

use App\Models\User;
use App\Models\UserToken;

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

UserToken::create([
    'user_id'    => $user->id,
    'token'      => $token,
    'expires_at' => date('Y-m-d H:i:s', strtotime('+1 hour')), // expires in 1 hour
]);

// Set cookie
setcookie('auth_token', $token, [
    'expires' => time() + 3600,
    'path' => '/',
    'secure' => false,   // true if using HTTPS
    'httponly' => true,
    'samesite' => 'Lax'
]);

// ✅ Return full user info so frontend doesn't need extra request
echo json_encode([
    'authenticated' => true,
    'message'       => 'Login successful',
    'name'          => $user->name,
    'email'         => $user->email
]);
