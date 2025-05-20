<?php
require '../config/bootstrap.php';
require '../app/cors.php';
enableCors($ALLOWED_ORIGINS, true);
require '../app/auth.php';
use App\Models\UserToken;

header('Content-Type: application/json');

// 1. Get the token from the cookie
if (!isset($_COOKIE['auth_token'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Kein Authentifizierungstoken gefunden']);
    exit;
}

$token = $_COOKIE['auth_token'];

// 2. Authenticate user using the token (from `auth.php`)
$user = authenticate(); // Should use the token from $_COOKIE internally

// 3. Delete the token from the database
UserToken::where('user_id', $user->id)
         ->where('token', $token)
         ->delete();

// 4. Expire the auth_token cookie
setcookie('auth_token', '', [
    'expires' => time() - 3600,
    'path' => '/',
    'secure' => false,                  // true if using HTTPS
    'httponly' => true,
    'samesite' => 'Lax'
]);

echo json_encode([
    'authenticated' => false,
    'message' => 'Logout erfolgreich']);
