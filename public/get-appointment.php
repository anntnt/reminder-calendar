<?php
/*ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);*/

require '../config/bootstrap.php';
require '../app/cors.php';
enableCors($ALLOWED_ORIGINS, true);
require_once '../app/auth.php';
header('Content-Type: application/json');




// Get the authenticated user via the token
$user = getAuthenticatedUser();

if (!$user) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized: Invalid or missing token']);
    exit;
}

try {
    // use Eloquent relationship
    $appointments = $user->appointments;

    echo json_encode($appointments);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
