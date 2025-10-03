'use client'

import { useState, useMemo } from 'react'
import { Vehicle } from '@/types'
import VehicleCard from './VehicleCard'

interface VehicleFiltersProps {
  vehicles: Vehicle[]
}

export default function VehicleFilters({ vehicles }: VehicleFiltersProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [selectedCondition, setSelectedCondition] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')

  // Extract unique brands
  const brands = useMemo(() => {
    const brandSet = new Set<string>()
    vehicles.forEach(vehicle => {
      if (vehicle.metadata.brand) {
        brandSet.add(vehicle.metadata.brand.metadata.brand_name)
      }
    })
    return Array.from(brandSet).sort()
  }, [vehicles])

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      // Brand filter
      if (selectedBrand !== 'all') {
        if (!vehicle.metadata.brand || 
            vehicle.metadata.brand.metadata.brand_name !== selectedBrand) {
          return false
        }
      }

      // Condition filter
      if (selectedCondition !== 'all') {
        if (vehicle.metadata.condition.key !== selectedCondition) {
          return false
        }
      }

      // Price range filter
      if (priceRange !== 'all') {
        const price = vehicle.metadata.price
        switch (priceRange) {
          case 'under100k':
            if (price >= 100000) return false
            break
          case '100k-200k':
            if (price < 100000 || price >= 200000) return false
            break
          case '200k-300k':
            if (price < 200000 || price >= 300000) return false
            break
          case 'over300k':
            if (price < 300000) return false
            break
        }
      }

      return true
    })
  }, [vehicles, selectedBrand, selectedCondition, priceRange])

  return (
    <div>
      {/* Filters */}
      <div className="bg-secondary-light rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Filter Vehicles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">
              Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Condition Filter */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">
              Condition
            </label>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Conditions</option>
              <option value="new">New</option>
              <option value="certified">Certified Pre-Owned</option>
              <option value="used">Used</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">
              Price Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Prices</option>
              <option value="under100k">Under $100,000</option>
              <option value="100k-200k">$100,000 - $200,000</option>
              <option value="200k-300k">$200,000 - $300,000</option>
              <option value="over300k">Over $300,000</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-gray-400">
          Showing {filteredVehicles.length} of {vehicles.length} vehicles
        </div>
      </div>

      {/* Vehicle Grid */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-secondary-light rounded-lg">
          <p className="text-gray-400 text-lg">
            No vehicles match your current filters.
          </p>
          <button
            onClick={() => {
              setSelectedBrand('all')
              setSelectedCondition('all')
              setPriceRange('all')
            }}
            className="mt-4 text-primary hover:text-primary-dark font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}