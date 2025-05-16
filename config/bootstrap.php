<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Illuminate\Database\Capsule\Manager as Capsule;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Debug: Check if DB_NAME is set (optional)
if (empty($_ENV['DB_NAME'])) {
    die('❌ DB_NAME is not set or empty');
}

// Setup Eloquent
$capsule = new Capsule;

$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => $_ENV['DB_HOST'],
    'database'  => $_ENV['DB_NAME'] ,
    'username'  => $_ENV['DB_USER'],
    'password'  => $_ENV['DB_PASS'] ,
    'charset'   => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix'    => '',
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();

