<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 20)->nullable()->after('name');
            $table->string('avatar')->nullable()->after('phone');
            $table->enum('role', ['customer', 'admin', 'staff'])->default('customer')->after('avatar');
            $table->enum('status', ['active', 'inactive', 'banned'])->default('active')->after('role');
            $table->date('date_of_birth')->nullable()->after('status');
            $table->enum('gender', ['male', 'female', 'other'])->nullable()->after('date_of_birth');
            $table->string('referral_code', 20)->nullable()->unique()->after('gender');
            $table->unsignedBigInteger('referred_by')->nullable()->after('referral_code');
            $table->timestamp('last_login_at')->nullable()->after('referred_by');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone', 'avatar', 'role', 'status', 'date_of_birth',
                'gender', 'referral_code', 'referred_by', 'last_login_at',
            ]);
        });
    }
};
