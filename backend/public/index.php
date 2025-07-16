<?php

// Load CORS headers first
require_once __DIR__ . '/../config/cors.php';

// ✅ Stop execution early if this is a preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Autoload classes and bootstrap
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../config/bootstrap.php';

use App\Controllers\AuthController;
use App\Controllers\AppointmentController;

// Set JSON content type for response
header('Content-Type: application/json');

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// AUTH routes
if ($uri === '/api/register' && $method === 'POST') {
    $controller = new AuthController();
    echo json_encode($controller->register(json_decode(file_get_contents('php://input'), true)));
} elseif ($uri === '/api/login' && $method === 'POST') {
    $controller = new AuthController();
    echo json_encode($controller->login(json_decode(file_get_contents('php://input'), true)));
} elseif ($uri === '/api/logout' && $method === 'POST') {
    $controller = new AuthController();
    echo json_encode($controller->logout());
} elseif ($uri === '/api/check' && $method === 'GET') {
    $controller = new AuthController();
    echo json_encode($controller->check());
    exit;
}

// APPOINTMENT routes
elseif ($uri === '/api/appointments' && $method === 'GET') {
    $controller = new AppointmentController();
    echo json_encode($controller->get());
} elseif ($uri === '/api/appointments' && $method === 'POST') {
    $controller = new AppointmentController();
    echo json_encode($controller->create(json_decode(file_get_contents('php://input'), true)));
} elseif (preg_match('#^/api/appointments/(\d+)$#', $uri, $matches)) {
    $id = (int)$matches[1];
    $controller = new AppointmentController();

    error_log("Appointment endpoint hit. ID: $id, Method: $method");

    if ($method === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);
        error_log("Update request for appointment ID $id with data: " . json_encode($input));
        echo json_encode($controller->update($id, $input));
    } elseif ($method === 'DELETE') {
        error_log("Delete request for appointment ID $id");
        echo json_encode($controller->delete($id));
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
} else {
    // fallback
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
}
