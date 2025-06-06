<?php
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../cors.php';

$ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'https://reminder-calendar.fly.dev'
];

enableCors($ALLOWED_ORIGINS, true);
use Illuminate\Database\Capsule\Manager as Capsule;
use Dotenv\Dotenv;


// Try Fly.io path first

$envPath = __DIR__ . '/../';



if (!file_exists($envPath . '.env')) {

    // Fallback to local path

    $envPath = __DIR__ . '/../../';

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
    'charset'   => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix'    => '',
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();

