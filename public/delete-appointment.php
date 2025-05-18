<?php
use App\Models\Appointment;

require '../app/cors.php';
enableCors('http://localhost:3000', true);

require '../config/bootstrap.php';
require '../app/auth.php';

header('Content-Type: application/json');

// Authenticate the user
$user = authenticate();
if (!$user) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Support both query string and JSON body
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// Get ID from query or body
$id = $_GET['id'] ?? ($input['id'] ?? null);

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing appointment ID']);
    exit;
}

try {
    $appointment = Appointment::find($id);

    if (!$appointment) {
        http_response_code(404);
        echo json_encode(['error' => 'Appointment not found']);
        exit;
    }

    // Ensure the authenticated user owns the appointment
    if ($appointment->user_id !== $user->id) {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden: You do not own this appointment']);
        exit;
    }

    $appointment->delete();

    echo json_encode(['message' => 'Appointment deleted successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Deletion failed: ' . $e->getMessage()]);
}
