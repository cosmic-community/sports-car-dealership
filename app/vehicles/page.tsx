import { getVehicles } from '@/lib/cosmic'
import { Vehicle } from '@/types'
import VehicleCard from '@/components/VehicleCard'
import VehicleFilters from '@/components/VehicleFilters'

export default async function VehiclesPage() {
  const vehicles = await getVehicles() as Vehicle[]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Inventory</h1>
          <p className="text-gray-400 text-lg">
            Browse our selection of premium luxury sports cars
          </p>
        </div>

        <VehicleFilters vehicles={vehicles} />
      </div>
    </div>
  )
}