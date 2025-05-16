<?php
// Set default headers for CORS
function enableCors($origin = '*', $allowCredentials = false) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    if ($allowCredentials) {
        header("Access-Control-Allow-Credentials: true");
    }

    // Handle preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}
