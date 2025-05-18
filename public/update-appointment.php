<?php
use App\Models\Appointment;

require '../app/cors.php';
enableCors('http://localhost:3000', true);

require '../config/bootstrap.php';
require '../app/auth.php';

header('Content-Type: application/json');

// Parse JSON request body
$data = json_decode(file_get_contents('php://input'), true);

// Basic field validation
if (!isset($data['id'], $data['title'], $data['date'], $data['notify_before_days'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Get authenticated user
$user = getAuthenticatedUser();

if (!$user) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized: Invalid or missing token']);
    exit;
}

// Input validation
if (!is_string($data['title']) || trim($data['title']) === '') {
    http_response_code(422);
    echo json_encode(['error' => 'Title must be a non-empty string']);
    exit;
}

if (!strtotime($data['date'])) {
    http_response_code(422);
    echo json_encode(['error' => 'Invalid date format']);
    exit;
}

if (!is_numeric($data['notify_before_days']) || $data['notify_before_days'] < 0) {
    http_response_code(422);
    echo json_encode(['error' => 'notify_before_days must be a non-negative number']);
    exit;
}

try {
    $appointment = Appointment::find($data['id']);

    if (!$appointment) {
        http_response_code(404);
        echo json_encode(['error' => 'Appointment not found']);
        exit;
    }

    // Ownership check
    if ($appointment->user_id !== $user->id) {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden: You do not own this appointment']);
        exit;
    }

    // Update the appointment
    $appointment->fill([
        'title' => $data['title'],
        'date' => $data['date'],
        'notify_before_days' => $data['notify_before_days'],
    ]);

    $appointment->save();

    echo json_encode(['success' => true, 'appointment' => $appointment]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Update failed: ' . $e->getMessage()]);
}
