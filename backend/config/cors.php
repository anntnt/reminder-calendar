<?php
// Only apply CORS headers for HTTP requests
if (php_sapi_name() !== 'cli') {
    if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header("Access-Control-Allow-Origin: http://localhost:3000");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        http_response_code(200);
        exit();
    }

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
}
