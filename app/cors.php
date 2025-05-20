<?php
function enableCors($allowedOrigins = [], $allowCredentials = false) {
    if (!isset($_SERVER['HTTP_ORIGIN'])) {
        return;
    }

    $origin = $_SERVER['HTTP_ORIGIN'];

    if (in_array($origin, $allowedOrigins)) {
        header("Access-Control-Allow-Origin: $origin");

        if ($allowCredentials) {
            header("Access-Control-Allow-Credentials: true");
        }

        // Optional: allow these methods
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

        // Optional: allow these headers
        header("Access-Control-Allow-Headers: Content-Type, Authorization");

        // Handle preflight
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
}


