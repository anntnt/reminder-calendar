<?php
/*ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);*/

require '../app/cors.php';
enableCors('http://localhost:3000', true);

header('Content-Type: application/json');
require_once '../config/bootstrap.php';
require_once '../app/auth.php';


use App\Models\Appointment;

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
