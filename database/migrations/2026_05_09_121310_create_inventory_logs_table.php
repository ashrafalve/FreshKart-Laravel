<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inventory_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->index();
            $table->unsignedBigInteger('variant_id')->nullable()->index();
            $table->unsignedBigInteger('user_id')->nullable(); // who made the change
            $table->enum('type', ['stock_in', 'stock_out', 'adjustment', 'sale', 'return'])->index();
            $table->integer('quantity_before');
            $table->integer('quantity_change'); // positive or negative
            $table->integer('quantity_after');
            $table->string('reference_type')->nullable(); // order, purchase, manual
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inventory_logs');
    }
};
