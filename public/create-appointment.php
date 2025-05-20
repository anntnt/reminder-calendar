<?php
use App\Models\Appointment;
require '../config/bootstrap.php';
require '../app/cors.php';
enableCors($ALLOWED_ORIGINS, true);

header('Content-Type: application/json');

try {
    $user = authenticate(); // Only logged-in users can continue

    $data = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    if (
        !isset($data['title'], $data['date'], $data['notify_before_days']) ||
        !is_string($data['title']) ||
        !is_string($data['date']) ||
        !is_numeric($data['notify_before_days'])
    ) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing or invalid required fields']);
        exit;
    }

    // Validate date format (YYYY-MM-DD)
    $date = DateTime::createFromFormat('Y-m-d', $data['date']);
    if (!$date || $date->format('Y-m-d') !== $data['date']) {
        
        http_response_code(400);
        echo json_encode(['error' => 'Invalid date format, expected YYYY-MM-DD']);
        exit;
    }

    // Create the appointment
    $appointment = Appointment::create([
        'user_id'            => $user->id,
        'title'              => htmlspecialchars(trim($data['title'])),
        'date'               => $data['date'],
        'notify_before_days' => (int)$data['notify_before_days'],
    ]);

    echo json_encode([
        'message'     => 'Appointment created successfully',
        'appointment' => $appointment,
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error'   => 'Server error',
        'details' => $e->getMessage()
    ]);
}
