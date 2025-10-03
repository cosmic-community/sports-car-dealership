import Link from 'next/link'
import { Brand } from '@/types'

interface BrandCardProps {
  brand: Brand
}

export default function BrandCard({ brand }: BrandCardProps) {
  const logo = brand.metadata.logo

  return (
    <Link 
      href={`/brands/${brand.slug}`}
      className="group bg-secondary-light rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all duration-200"
    >
      {logo && (
        <div className="relative h-48 flex items-center justify-center bg-white p-8">
          <img
            src={`${logo.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={brand.metadata.brand_name}
            className="max-w-full max-h-full object-contain"
            width="300"
            height="200"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {brand.metadata.brand_name}
        </h3>
        
        {brand.metadata.country && (
          <p className="text-gray-400 text-sm mb-3">
            Origin: {brand.metadata.country}
          </p>
        )}
        
        {brand.metadata.description && (
          <p className="text-gray-300 text-sm line-clamp-3">
            {brand.metadata.description}
          </p>
        )}
        
        <div className="mt-4 text-primary font-semibold group-hover:underline">
          View Vehicles →
        </div>
      </div>
    </Link>
  )
}