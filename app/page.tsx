import Link from 'next/link'
import { getFeaturedVehicles, getBrands } from '@/lib/cosmic'
import { Vehicle, Brand } from '@/types'
import VehicleCard from '@/components/VehicleCard'
import BrandCard from '@/components/BrandCard'

export default async function HomePage() {
  const featuredVehicles = await getFeaturedVehicles() as Vehicle[]
  const brands = await getBrands() as Brand[]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://imgix.cosmicjs.com/3be29420-a009-11f0-8c2f-71055d67fae4-photo-1583121274602-3e2820c69888-1759462196703.jpg?w=1920&h=1080&fit=crop&auto=format,compress')`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Elite Sports Cars
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Experience the pinnacle of automotive excellence
          </p>
          <Link 
            href="/vehicles"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
          >
            Browse Inventory
          </Link>
        </div>
      </section>

      {/* Featured Vehicles */}
      {featuredVehicles && featuredVehicles.length > 0 && (
        <section className="py-20 px-4 bg-secondary-light">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Featured Vehicles</h2>
              <p className="text-gray-400 text-lg">Our most exceptional vehicles currently available</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brands Section */}
      {brands && brands.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Prestigious Brands</h2>
              <p className="text-gray-400 text-lg">Representing the world's finest automotive manufacturers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {brands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Visit Our Showrooms</h2>
          <p className="text-gray-400 text-lg mb-8">
            Experience these extraordinary vehicles in person at our Beverly Hills or Miami Beach locations
          </p>
          <Link 
            href="/locations"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
          >
            View Locations
          </Link>
        </div>
      </section>
    </div>
  )
}