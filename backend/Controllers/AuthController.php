<?php

namespace App\Controllers;

use App\Models\User;
use App\Models\UserToken;

class AuthController
{
    public function register(array $data)
    {
        if (!isset($data['name'], $data['email'], $data['password'])) {
            http_response_code(400);
            return ['error' => 'Name, email, and password are required'];
        }

        $name = trim($data['name']);
        $email = trim($data['email']);
        $password = trim($data['password']);

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            return ['error' => 'Invalid email format'];
        }

        if (User::where('email', $email)->exists()) {
            http_response_code(409);
            return ['error' => 'Email already registered'];
        }

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password_hash' => password_hash($password, PASSWORD_DEFAULT),
        ]);

        if (!$user) {
            http_response_code(500);
            return ['error' => 'Registration failed'];
        }

        return ['message' => 'Registration successful', 'user_id' => $user->id];
    }

    public function login(array $data)
    {
        if (!isset($data['email'], $data['password'])) {
            http_response_code(400);
            return ['error' => 'Email and password are required'];
        }

        $email = trim($data['email']);
        $password = trim($data['password']);

        $user = User::where('email', $email)->first();

        if (!$user || !$user->password_hash || !password_verify($password, $user->password_hash)) {
            http_response_code(401);
            return ['error' => 'Invalid credentials'];
        }

        // Generate and store token in user_tokens table
        $token = bin2hex(random_bytes(32));
        UserToken::updateOrCreate(
            ['user_id' => $user->id],
            ['token' => $token]
        );

        // Set secure auth token cookie
        setcookie('auth_token', $token, [
            'expires' => time() + 3600,
            'path' => '/',
            'secure' => true,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);

        return ['authenticated' => true,
                'message' => 'Login successful',
                'name'          => $user->name,
                'email'         => $user->email];
    }

    public function logout()
    {
        $token = $_COOKIE['auth_token'] ?? null;

        if ($token) {
            UserToken::where('token', $token)->delete();
        }

        setcookie('auth_token', '', [
            'expires' => time() - 3600,
            'path' => '/',
            'secure' => true,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);

        return ['message' => 'Logged out'];
    }

    public function check()
    {
        $token = $_COOKIE['auth_token'] ?? null;

        if (!$token) {
            return ['authenticated' => false];
        }

        $userToken = UserToken::where('token', $token)->first();

        if (!$userToken || !$userToken->user) {
            return ['authenticated' => false];
        }

        return [
            'authenticated' => true,
            'name' => $userToken->user->name,
            'email' => $userToken->user->email,
        ];
    }
}
