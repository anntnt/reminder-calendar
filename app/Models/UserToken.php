<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class UserToken extends Model
{
    protected $table = 'user_tokens';
    protected $fillable = ['user_id', 'token'];
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
