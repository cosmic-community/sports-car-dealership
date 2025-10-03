import Link from 'next/link'
import { Vehicle } from '@/types'

interface VehicleCardProps {
  vehicle: Vehicle
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const featuredImage = vehicle.metadata.featured_image
  const brand = vehicle.metadata.brand

  return (
    <Link 
      href={`/vehicles/${vehicle.slug}`}
      className="group bg-secondary-light rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all duration-200"
    >
      {featuredImage && (
        <div className="relative h-64 overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            width="400"
            height="300"
          />
          {vehicle.metadata.featured && (
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        {brand && (
          <p className="text-primary text-sm font-semibold mb-2">
            {brand.metadata.brand_name}
          </p>
        )}
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {vehicle.title}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">
            ${vehicle.metadata.price.toLocaleString()}
          </span>
          <span className="text-gray-400 text-sm">
            {vehicle.metadata.mileage.toLocaleString()} miles
          </span>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 bg-secondary rounded-full text-sm">
            {vehicle.metadata.condition.value}
          </span>
          {vehicle.metadata.year && (
            <span className="text-gray-400 text-sm">
              {vehicle.metadata.year}
            </span>
          )}
          {vehicle.metadata.horsepower && (
            <span className="text-gray-400 text-sm">
              {vehicle.metadata.horsepower} HP
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}