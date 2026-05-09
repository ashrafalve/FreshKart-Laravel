<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number', 30)->unique()->index();
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->unsignedBigInteger('coupon_id')->nullable();
            $table->unsignedBigInteger('delivery_slot_id')->nullable();

            // Status
            $table->enum('status', [
                'pending', 'confirmed', 'processing',
                'out_for_delivery', 'delivered', 'cancelled', 'refunded'
            ])->default('pending')->index();

            $table->enum('payment_status', ['unpaid', 'paid', 'partial', 'refunded'])->default('unpaid');
            $table->enum('payment_method', ['cod', 'sslcommerz', 'bkash', 'nagad', 'card'])->default('cod');

            // Pricing
            $table->decimal('subtotal', 10, 2);
            $table->decimal('discount_amount', 10, 2)->default(0);
            $table->decimal('coupon_discount', 10, 2)->default(0);
            $table->decimal('shipping_charge', 10, 2)->default(0);
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->decimal('total', 10, 2);

            // Shipping address snapshot
            $table->string('shipping_name');
            $table->string('shipping_phone', 20);
            $table->string('shipping_address_line1');
            $table->string('shipping_address_line2')->nullable();
            $table->string('shipping_area')->nullable();
            $table->string('shipping_city');
            $table->string('shipping_district');
            $table->string('shipping_division');
            $table->string('shipping_postal_code', 20)->nullable();

            $table->text('order_notes')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('coupon_id')->references('id')->on('coupons')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
