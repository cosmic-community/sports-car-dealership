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
      className="group bg-secondary-light rounded-2xl overflow-hidden card-hover border border-gray-800 hover:border-primary/50"
    >
      {featuredImage && (
        <div className="relative h-72 overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            width="400"
            height="300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {vehicle.metadata.featured && (
            <div className="absolute top-6 right-6 bg-gradient-to-r from-primary to-primary-light text-white px-4 py-2 rounded-full text-sm font-semibold shadow-glow">
              Featured
            </div>
          )}
        </div>
      )}
      
      <div className="p-8">
        {brand && (
          <p className="text-primary text-sm font-bold mb-3 uppercase tracking-wide">
            {brand.metadata.brand_name}
          </p>
        )}
        
        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
          {vehicle.title}
        </h3>
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            ${vehicle.metadata.price.toLocaleString()}
          </span>
          <span className="text-gray-400 text-sm font-medium">
            {vehicle.metadata.mileage.toLocaleString()} mi
          </span>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-4 py-2 bg-secondary-lighter rounded-full text-sm font-medium border border-gray-700">
            {vehicle.metadata.condition.value}
          </span>
          {vehicle.metadata.year && (
            <span className="text-gray-400 text-sm font-medium">
              {vehicle.metadata.year}
            </span>
          )}
          {vehicle.metadata.horsepower && (
            <span className="text-gray-400 text-sm font-medium">
              {vehicle.metadata.horsepower} HP
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}