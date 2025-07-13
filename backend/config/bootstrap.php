<?php
file_put_contents('php://stderr', "✅ bootstrap.php loaded\n");

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/cors.php';


use Illuminate\Database\Capsule\Manager as Capsule;
use Dotenv\Dotenv;


$envPath = __DIR__ . '/../../';
if (!file_exists($envPath . '.env')) {
    die('❌ .env file not found at expected location: ' . $envPath . '.env');
}

$dotenv = Dotenv::createImmutable($envPath);


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
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();

