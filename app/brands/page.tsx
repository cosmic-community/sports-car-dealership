import { getBrands } from '@/lib/cosmic'
import { Brand } from '@/types'
import BrandCard from '@/components/BrandCard'

export default async function BrandsPage() {
  const brands = await getBrands() as Brand[]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Prestigious Brands</h1>
          <p className="text-gray-400 text-lg">
            Representing the world's finest automotive manufacturers
          </p>
        </div>

        {brands && brands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No brands available at this time.</p>
          </div>
        )}
      </div>
    </div>
  )
}