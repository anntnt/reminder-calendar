<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $table = 'appointments';

    public $timestamps = false; // Set true if adding created_at / updated_at columns

    protected $fillable = [
        'user_id',
        'title',
        'date',
        'notify_before_days',
    ];

    // Optional: define relationship to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
