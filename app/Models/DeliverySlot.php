<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DeliverySlot extends Model
{
    use HasFactory;

    protected $fillable = [
        'zone_id',
        'label',
        'start_time',
        'end_time',
        'available_days',
        'max_orders',
        'is_active'
    ];

    protected $casts = [
        'available_days' => 'array',
        'is_active' => 'boolean',
    ];

    public function zone(): BelongsTo
    {
        return $this->belongsTo(DeliveryZone::class);
    }
}
