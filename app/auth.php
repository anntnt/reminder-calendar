<?php
require_once __DIR__ . '/Models/UserToken.php';
require_once __DIR__ . '/Models/User.php';

function authenticate()
{
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Missing Authorization header']);
        exit;
    }

    if (!preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid token format']);
        exit;
    }

    $token = $matches[1];

    $tokenRecord = UserToken::where('token', $token)->first();

    if (!$tokenRecord) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid or expired token']);
        exit;
    }

    // Check token expiration
    if ($tokenRecord->expires_at && strtotime($tokenRecord->expires_at) < time()) {
        http_response_code(401);
        echo json_encode(['error' => 'Token has expired']);
        exit;
    }

    return $tokenRecord->user;
}
