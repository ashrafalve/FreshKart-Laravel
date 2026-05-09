<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('delivery_slots', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('zone_id')->nullable()->index();
            $table->string('label'); // e.g., "Morning (8AM - 12PM)"
            $table->time('start_time');
            $table->time('end_time');
            $table->json('available_days'); // ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
            $table->integer('max_orders')->default(50);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('zone_id')->references('id')->on('delivery_zones')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('delivery_slots');
    }
};
