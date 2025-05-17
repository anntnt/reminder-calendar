<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Models\Appointment; 

class User extends Model {
    protected $table = 'users';
    public $timestamps = false; // Set true if having created_at/updated_at

    protected $fillable = [
        'name',
        'email',
        'password_hash',
    ];

    // relationship to Appointment
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
