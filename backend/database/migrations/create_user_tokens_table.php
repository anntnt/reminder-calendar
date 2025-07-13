<?php

use Illuminate\Database\Capsule\Manager as Capsule;

if (!Capsule::schema()->hasTable('user_tokens')) {
    Capsule::schema()->create('user_tokens', function ($table) {
        $table->increments('id');
        $table->unsignedInteger('user_id');
        $table->string('token', 64)->unique();
        $table->timestamps();

        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    });
}
