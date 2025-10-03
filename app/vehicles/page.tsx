import { getVehicles } from '@/lib/cosmic'
import { Vehicle } from '@/types'
import VehicleFilters from '@/components/VehicleFilters'

export default async function VehiclesPage() {
  const vehicles = await getVehicles() as Vehicle[]

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">Our Inventory</h1>
          <p className="text-gray-400 text-xl font-light">
            Browse our selection of premium luxury sports cars
          </p>
        </div>

        <VehicleFilters vehicles={vehicles} />
      </div>
    </div>
  )
}