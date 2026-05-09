<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DeliveryZone extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'areas',
        'delivery_charge',
        'free_delivery_min_order',
        'estimated_days_min',
        'estimated_days_max',
        'is_active'
    ];

    protected $casts = [
        'areas' => 'array',
        'delivery_charge' => 'decimal:2',
        'free_delivery_min_order' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function slots(): HasMany
    {
        return $this->hasMany(DeliverySlot::class, 'zone_id');
    }
}
