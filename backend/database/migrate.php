<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;
use Dotenv\Dotenv;

// Load env
$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

// Setup database connection
$capsule = new Capsule;

$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => $_ENV['DB_HOST'],
    'port'      => $_ENV['DB_PORT'],
    'database'  => $_ENV['DB_NAME'],
    'username'  => $_ENV['DB_USER'],
    'password'  => $_ENV['DB_PASS'],
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);

$capsule->setAsGlobal();       
$capsule->bootEloquent();     

// Require migrations in the right order
require_once __DIR__ . '/migrations/create_users_table.php';
require_once __DIR__ . '/migrations/create_user_tokens_table.php';
require_once __DIR__ . '/migrations/create_appointments_table.php';
