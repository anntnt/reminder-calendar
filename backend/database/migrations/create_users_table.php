<?php

use Illuminate\Database\Capsule\Manager as Capsule;

if (!Capsule::schema()->hasTable('users')) {
    Capsule::schema()->create('users', function ($table) {
        $table->increments('id');
        $table->string('name');
        $table->string('email')->unique();
        $table->string('password_hash');
        $table->timestamps();
    });
}
