<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category_id',
        'brand_id',
        'name',
        'slug',
        'short_description',
        'description',
        'sku',
        'barcode',
        'price',
        'sale_price',
        'cost_price',
        'unit',
        'unit_value',
        'stock_quantity',
        'min_order_quantity',
        'max_order_quantity',
        'low_stock_threshold',
        'track_stock',
        'allow_backorder',
        'stock_status',
        'thumbnail',
        'is_active',
        'is_featured',
        'is_trending',
        'is_flash_sale',
        'flash_sale_price',
        'flash_sale_starts_at',
        'flash_sale_ends_at',
        'rating_avg',
        'rating_count',
        'sales_count',
        'views_count',
        'tax_rate',
        'tax_type',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'sort_order'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'sale_price' => 'decimal:2',
        'cost_price' => 'decimal:2',
        'flash_sale_price' => 'decimal:2',
        'unit_value' => 'decimal:3',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'is_trending' => 'boolean',
        'is_flash_sale' => 'boolean',
        'track_stock' => 'boolean',
        'allow_backorder' => 'boolean',
        'flash_sale_starts_at' => 'datetime',
        'flash_sale_ends_at' => 'datetime',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class)->orderBy('sort_order');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class)->where('is_approved', true);
    }
}
