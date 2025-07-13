<?php

use Illuminate\Database\Capsule\Manager as Capsule;

if (!Capsule::schema()->hasTable('appointments')) {
    Capsule::schema()->create('appointments', function ($table) {
        $table->increments('id');
        $table->unsignedInteger('user_id');
        $table->string('title');
        $table->date('date');
        $table->integer('notify_before_days'); 
        $table->boolean('reminder_sent')->default(false); 
        $table->timestamps();

        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    });
}
