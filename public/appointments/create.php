<?php
use App\Models\Appointment;
require '../config/bootstrap.php';
require '../app/auth.php';

header('Content-Type: application/json');

$user = authenticate(); // Only logged-in users can continue

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['title'], $data['date'], $data['notify_before_days'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$appointment = Appointment::create([
    'user_id'            => $user->id,
    'title'              => $data['title'],
    'date'               => $data['date'],
    'notify_before_days' => $data['notify_before_days'],
]);

echo json_encode([
    'message'     => 'Appointment created',
    'appointment' => $appointment,
]);
