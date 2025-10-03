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
      className="group bg-secondary-light rounded-2xl overflow-hidden card-hover border border-gray-800 hover:border-primary/50"
    >
      {logo && (
        <div className="relative h-56 flex items-center justify-center bg-gradient-to-br from-gray-100 to-white p-10">
          <img
            src={`${logo.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={brand.metadata.brand_name}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
            width="300"
            height="200"
          />
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
          {brand.metadata.brand_name}
        </h3>
        
        {brand.metadata.country && (
          <p className="text-gray-400 text-sm mb-4 font-medium uppercase tracking-wide">
            Origin: {brand.metadata.country}
          </p>
        )}
        
        {brand.metadata.description && (
          <p className="text-gray-300 text-sm line-clamp-3 mb-6 leading-relaxed">
            {brand.metadata.description}
          </p>
        )}
        
        <div className="flex items-center text-primary font-bold group-hover:gap-2 transition-all">
          <span>View Vehicles</span>
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  )
}