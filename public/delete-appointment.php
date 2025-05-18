<?php
use App\Models\Appointment;

require '../app/cors.php';
enableCors('http://localhost:3000', true);

require '../config/bootstrap.php';
require '../app/auth.php';
header('Content-Type: application/json');
// Only logged-in users can continue
$user = authenticate();
// Check if the user is logged in
if (!$user) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}
// Only allow DELETE requests
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Parse raw input to get ID (if sent via fetch or axios)
parse_str(file_get_contents("php://input"), $deleteVars);
$id = $_GET['id'] ?? $deleteVars['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing appointment ID']);
    exit;
}

$appointment = Appointment::find($id);

if (!$appointment) {
    http_response_code(404);
    echo json_encode(['error' => 'Appointment not found']);
    exit;
}

$appointment->delete();

echo json_encode(['message' => 'Appointment deleted successfully']);
