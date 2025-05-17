<?php
require_once __DIR__ . '/Models/UserToken.php';
require_once __DIR__ . '/Models/User.php';

use App\Models\User;
use App\Models\UserToken;

function authenticate()
{
    if (!isset($_COOKIE['auth_token'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Missing authentication token']);
        exit;
    }

    $token = $_COOKIE['auth_token'];

    $tokenRecord = UserToken::where('token', $token)->first();

    if (!$tokenRecord) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid or expired token']);
        exit;
    }

    if ($tokenRecord->expires_at && strtotime($tokenRecord->expires_at) < time()) {
        http_response_code(401);
        echo json_encode(['error' => 'Token has expired']);
        exit;
    }

    return $tokenRecord->user;
}
    
/**
 * Validates the auth token from cookie and returns the User model or null.
 *
 * @return User|null
 */
function getAuthenticatedUser(): ?User
{
    $token = $_COOKIE['auth_token'] ?? null;

    if (!$token) {
        return null;
    }

    $userToken = UserToken::with('user')
        ->where('token', $token)
        ->first();

    return $userToken?->user ?? null;
}

