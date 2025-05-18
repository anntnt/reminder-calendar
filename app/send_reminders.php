<?php
require './config/bootstrap.php';
require './vendor/autoload.php';

use App\Models\Appointment;
use PHPMailer\PHPMailer\PHPMailer;

function logMessage($message) {
    $logFile = __DIR__ . '/reminder_log.txt';
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $message\n", FILE_APPEND);
}

logMessage("=== Reminder script started ===");

$today = date('Y-m-d');
logMessage("Today's date: {$today}");

$appointments = Appointment::all();
logMessage("Total appointments fetched: " . count($appointments));

foreach ($appointments as $appointment) {
    $appointmentDate = date('Y-m-d', strtotime($appointment->date));
    $notifyDate = date('Y-m-d', strtotime("-{$appointment->notify_before_days} days", strtotime($appointment->date)));

    logMessage("Checking appointment ID {$appointment->id}: appointment date {$appointmentDate}, notify date {$notifyDate}");

    if ($today === $notifyDate) {
        logMessage("Appointment ID {$appointment->id} is due for notification today.");

        $user = $appointment->user;

        if (!$user || empty($user->email)) {
            logMessage("Skipped: No user or email for appointment ID {$appointment->id}");
            continue;
        }

        $mail = new PHPMailer(true);

        try {
            logMessage("Preparing to send email to {$user->email}");

            $mail->isSMTP();
            $mail->Host = $_ENV['MAIL_HOST'];
            $mail->SMTPAuth = filter_var($_ENV['MAIL_SMTP_AUTH'], FILTER_VALIDATE_BOOLEAN);
            $mail->Port = (int)$_ENV['MAIL_PORT'];
            $mail->setFrom($_ENV['MAIL_FROM_ADDRESS'], $_ENV['MAIL_FROM_NAME']);

            $mail->addAddress($user->email, $user->name);
            $mail->Subject = 'Appointment Reminder';
            $mail->Body = "Dear {$user->name},\n\nThis is a reminder that you have an appointment titled \"{$appointment->title}\" scheduled for {$appointment->date}.";

            $mail->send();

            logMessage("✅ Email sent to {$user->email} for appointment ID {$appointment->id}");
        } catch (Exception $e) {
            logMessage("❌ Failed to send email to {$user->email}: {$mail->ErrorInfo}");
        }
    } else {
        logMessage("Skipped: Appointment ID {$appointment->id} is not due today.");
    }
}

logMessage("=== Reminder script completed ===");
