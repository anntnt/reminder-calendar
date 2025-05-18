<?php
use App\Models\Appointment;

require '../app/cors.php';
enableCors('http://localhost:3000', true);

require '../config/bootstrap.php';
require '../app/auth.php';


header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id'], $data['title'], $data['date'], $data['notify_before_days'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

try {
    $appointment = Appointment::find($data['id']);

    if (!$appointment) {
        http_response_code(404);
        echo json_encode(['error' => 'Appointment not found']);
        exit;
    }

    $appointment->update([
        'title' => $data['title'],
        'date' => $data['date'],
        'notify_before_days' => $data['notify_before_days'],
    ]);

    echo json_encode(['success' => true, 'appointment' => $appointment]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Update failed: ' . $e->getMessage()]);
}
