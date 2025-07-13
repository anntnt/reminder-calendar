<?php

namespace App\Controllers;

use App\Models\Appointment;
use App\Models\UserToken;

class AppointmentController
{
    protected function getAuthenticatedUserId()
    {
        $token = $_COOKIE['auth_token'] ?? null;

        if (!$token) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized: Missing token']);
            exit;
        }

        $userToken = UserToken::where('token', $token)->first();

        if (!$userToken) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized: Invalid token']);
            exit;
        }

        return $userToken->user_id;
    }

    public function create(array $data)
    {
        $userId = $this->getAuthenticatedUserId();
        if (!isset($data['notify_before_days'])) {
            http_response_code(400);
            return ['error' => 'notify_before_days is required'];
        }
        

        $appointment = Appointment::create([
            'user_id' => $userId,
            'title' => $data['title'] ?? '',
            'date' => $data['date'] ?? '',
            'notify_before_days' => $data['notify_before_days'],
            'reminder_sent' => false,
        ]);
    // Log the created appointment
    error_log("Appointment created: " . json_encode($appointment->toArray()));
        return ['message' => 'Appointment created', 'appointment' => $appointment];
    }

    public function get()
    {
        $userId = $this->getAuthenticatedUserId();
    
        // Debug: Log or display user ID
        error_log("Fetching appointments for user ID: " . var_export($userId, true));
    
        if (!$userId) {
            http_response_code(401);
            return ['error' => 'Unauthorized - user ID not found'];
        }
    
        $appointments = Appointment::where('user_id', $userId)->get();
    
        // Debug: Log number of appointments
        error_log("Number of appointments retrieved: " . count($appointments));
    
        return $appointments;
    }
    

    public function update($id, array $data)
    {
        $userId = $this->getAuthenticatedUserId();

        $appointment = Appointment::where('id', $id)->where('user_id', $userId)->first();

        if (!$appointment) {
            http_response_code(404);
            return ['error' => 'Appointment not found'];
        }

        $appointment->update($data);
        return ['message' => 'Appointment updated', 'appointment' => $appointment];
    }

    public function delete($id)
    {
        $userId = $this->getAuthenticatedUserId();

        $appointment = Appointment::where('id', $id)->where('user_id', $userId)->first();

        if (!$appointment) {
            http_response_code(404);
            return ['error' => 'Appointment not found'];
        }

        $appointment->delete();
        return ['message' => 'Appointment deleted'];
    }
}
