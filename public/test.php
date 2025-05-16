<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/bootstrap.php';

use App\Models\User;

ini_set('display_errors', '1');
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use App\Models\Appointment;

// ✅ CREATE
$appointment = new Appointment();
$appointment->user_id = 1;
$appointment->title = 'Doctor Appointment';
$appointment->date = '2025-06-01';
$appointment->notify_before_days = 2;
$appointment->save();

echo "✅ Created Appointment ID: " . $appointment->id . "<br>";

// ✅ READ
$found = Appointment::find($appointment->id);
echo "📄 Found: " . $found->title . " on " . $found->date . "<br>";

// ✅ UPDATE
$found->title = 'Dentist Appointment';
$found->save();
echo "✏️ Updated to: " . $found->title . "<br>";

// ✅ DELETE
/*$found->delete();
echo "🗑️ Deleted appointment.<br>";*/