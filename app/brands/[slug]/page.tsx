// app/brands/[slug]/page.tsx
import { getBrandBySlug, getBrands, getVehiclesByBrand } from '@/lib/cosmic'
import { Brand, Vehicle } from '@/types'
import Link from 'next/link'
import VehicleCard from '@/components/VehicleCard'

export async function generateStaticParams() {
  const brands = await getBrands() as Brand[]
  
  return brands.map((brand) => ({
    slug: brand.slug,
  }))
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const brand = await getBrandBySlug(slug) as Brand | null

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Brand Not Found</h1>
          <Link href="/brands" className="text-primary hover:text-primary-dark">
            Back to Brands
          </Link>
        </div>
      </div>
    )
  }

  const vehicles = await getVehiclesByBrand(brand.id) as Vehicle[]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/brands"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          ← Back to Brands
        </Link>

        {/* Brand Header */}
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-6">
            {brand.metadata.logo && (
              <img
                src={`${brand.metadata.logo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={brand.metadata.brand_name}
                className="w-24 h-24 object-contain rounded-lg bg-white p-4"
                width="100"
                height="100"
              />
            )}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {brand.metadata.brand_name}
              </h1>
              {brand.metadata.country && (
                <p className="text-gray-400">Origin: {brand.metadata.country}</p>
              )}
            </div>
          </div>
          
          {brand.metadata.description && (
            <p className="text-gray-300 text-lg max-w-3xl">
              {brand.metadata.description}
            </p>
          )}
        </div>

        {/* Vehicles */}
        <div>
          <h2 className="text-3xl font-bold mb-8">
            Available {brand.metadata.brand_name} Vehicles
          </h2>
          
          {vehicles && vehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-secondary-light rounded-lg">
              <p className="text-gray-400">
                No {brand.metadata.brand_name} vehicles currently available.
              </p>
              <Link 
                href="/vehicles"
                className="inline-block mt-4 text-primary hover:text-primary-dark"
              >
                View All Inventory
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}