"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import { Slider } from "../ui/Slider";
import { Search, X, Filter } from "lucide-react";

const ProductFilters = ({ categories, onFilterChange, maxPrice }) => {
    const [filters, setFilters] = useState({
        title: '',
        categoryId: null,
        minPrice: 0,
        maxPrice: maxPrice || 1000,
        priceRangeMin: 0,
        priceRangeMax: maxPrice || 1000,
    });

    const [priceRange, setPriceRange] = useState([
        0, 
        maxPrice || 1000,
    ]);

    useEffect(() => {
        setPriceRange([0, maxPrice || 1000]);
        setFilters((prev) => ({
            ...prev,
            maxPrice: maxPrice || 1000,
            priceRangeMax: maxPrice || 1000,
        }));
    }, [maxPrice]);

    const handleTitleChange = (value) => {
        const newFilters = { ...filters, title: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleCategoryChange = (value) => {
        const caregoryId = value === 'all' ? null : parseInt(value);
        const newFilters = { ...filters, categoryId };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
        const newFilters = {
            ...filters,
            priceRangeMin: value[0],
            priceRangeMax: value[1],
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleMinPriceChange = (value) => {
        const minPrice = parseInt(value) || 0;
        const newFilters = { ...filters, minPrice };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleMaxPriceChange = (value) => {
        const maxPriceValue = parseInt(value) || maxPrice;
        const newFilters = {
            ...filters,
            maxPrice: maxPriceValue,
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const resetFilters = {
            title: '',
            categoryId: null,
            minPrice: 0,
            maxPrice: maxPrice || 1000,
            priceRangeMin: 0,
            priceRangeMax: maxPrice || 1000,
        };

        setFilters(resetFilters);
        setPriceRange([0, maxPrice || 1000]);
        onFilterChange(resetFilters);
    };

    const hasActiveFilters = filters.title !== '' ||
        filters.categoryId !== null ||
        filters.priceRangeMin > 0 ||
        filters.priceRangeMax < (maxPrice || 1000);

    return (
        <div
            className="space-y-6 rounded-lg border bg-white p-6 border-gray-200 dark:bg-gray-950"
        >
            <div
                className="flex items-center justify-between"
            >
                <div
                    className="flex items-center gap-2"
                >
                    <Filter className="h-5 w-5 text-blue-600" />
                    <h3
                        className="text-lg font-semibold dark:text-white"
                    >
                        {'Filters'}
                    </h3>
                </div>

                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                    >
                        <X className="mr-2 h-4 w-4" />
                        {'Clear'}
                    </Button>
                )}
            </div>

            {/**Search by title */}
            <div
                className="space-y-2"
            >
                <Label htmlFor="search-title">
                    {'Search by title'}
                </Label>
                <div className="relative">
                    <Search 
                        className="absolute left-3 top-1/3 h-4 w-4 -translate-y-1-/2 text-gray-400"
                    />
                    <Input 
                        id="search-title"
                        placeholder={'Product name...'}
                        value={filters.title}
                        onChange={(e) => 
                            handleTitleChange(e.target.value)
                        }
                        className="pl-9"
                    />
                </div>
            </div>

            {/**Category filter */}
            <div className="space-y-2">
                <Label htmlFor="category-filter">
                    {'Category'}
                </Label>
                <Select
                    value={filters.categoryId?.toString() || 'all'}
                    onValueChange={handleCategoryChange}
                >
                    <SelectTrigger id="category-filter" className="bg-gray-100 border-none font-bold">
                        <SelectValue 
                            placeholder={'All categories'}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all' className="bg-gray-100">
                            {'All categories'}
                        </SelectItem>
                        {categories.map((category) => {
                            <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                            >
                                {category.name}
                            </SelectItem>
                        })}
                    </SelectContent>
                </Select>
            </div>

            {/**Price range */}
            <div className="space-y-2">
                <Label>
                    {'Price Range'}
                </Label>
                <div className="px-2 pt-2">
                    <Slider 
                        min={0}
                        max={maxPrice || 1000}
                        step={10}
                        value={priceRange}
                        onValueChange={handlePriceRangeChange}
                        className="mb-4"
                    />
                    <div
                        className="flex justify-between text-sm text-gray-600 dark:text-gray-400"
                    >
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/**Exact prices */}
            <div
                className="grid grid-cols-2 gap-4"
            >
                <div className="space-y-2">
                    <Label htmlFor="min-price">
                        {'Min price'}
                    </Label>
                    <Input 
                        id="min-price"
                        type="number"
                        value={filters.minPrice || ''}
                        onChange={(e) => 
                            handleMinPriceChange(e.target.value)
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="max-price">
                        {'Max price'}
                    </Label>
                    <Input 
                        id="max-price"
                        type="number"
                        value={filters.maxPrice || ''}
                        onChange={(e) => 
                            handleMaxPriceChange(e.target.value)
                        }
                    />
                </div>
            </div>

            {/**Active filters */}
            {hasActiveFilters && (
                <div
                    className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950"
                >
                    <p
                        className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-100"
                    >
                        {'Active filters'}
                    </p>
                    <div
                        className="space-y-1 text-sm text-blue-700 dark:text-blue-300"
                    >
                        {filters.title && (
                            <p>
                                •{' '}
                                {'Title:'}
                                {' '}
                                "{filters.title}"
                            </p>
                        )}
                        {filters.categoryId && (
                            <p>
                                •{' '}
                                {'Category:'}
                                {' '}
                                {
                                    categories.find(
                                        (c) => c.id === filters.categoryId
                                    )?.name
                                }
                            </p>
                        )}

                        {(filters.priceRangeMax > 0 || 
                            filters.priceRangeMax <
                            (maxPrice || 1000)
                        ) && (
                            <p>
                                •{' '}
                                {'Price Range:'}
                                {' '}
                                ${filters.priceRangeMin} - $
                                {filters.priceRangeMax}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductFilters;
