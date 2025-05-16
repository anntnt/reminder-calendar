<?php
require '../config/bootstrap.php';
require '../app/auth.php';

header('Content-Type: application/json');

$user = authenticate();

echo json_encode([
    'id' => $user->id,
    'name' => $user->name,
    'email' => $user->email,
]);
