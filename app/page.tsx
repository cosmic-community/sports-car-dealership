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
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://imgix.cosmicjs.com/3be29420-a009-11f0-8c2f-71055d67fae4-photo-1583121274602-3e2820c69888-1759462196703.jpg?w=1920&h=1080&fit=crop&auto=format,compress')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-slate-950"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 gradient-text leading-tight">
            Elite Sports Cars
          </h1>
          <p className="text-xl md:text-3xl mb-12 text-gray-300 font-light">
            Experience the pinnacle of automotive excellence
          </p>
          <Link 
            href="/vehicles"
            className="inline-block bg-gradient-to-r from-primary to-primary-light hover:shadow-glow-lg text-white font-semibold px-12 py-5 rounded-full transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Explore Inventory
          </Link>
        </div>
      </section>

      {/* Featured Vehicles */}
      {featuredVehicles && featuredVehicles.length > 0 && (
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 gradient-text">Featured Collection</h2>
              <p className="text-gray-400 text-xl font-light">Our most exceptional vehicles currently available</p>
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
        <section className="py-24 px-4 bg-gradient-to-b from-transparent to-secondary-light/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 gradient-text">Prestigious Brands</h2>
              <p className="text-gray-400 text-xl font-light">Representing the world's finest automotive manufacturers</p>
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
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto text-center bg-gradient-to-r from-secondary-light to-secondary-lighter rounded-3xl p-16 shadow-2xl border border-gray-800">
          <h2 className="text-5xl font-bold mb-6 gradient-text">Visit Our Showrooms</h2>
          <p className="text-gray-300 text-xl mb-10 font-light max-w-3xl mx-auto">
            Experience these extraordinary vehicles in person at our Beverly Hills or Miami Beach locations
          </p>
          <Link 
            href="/locations"
            className="inline-block bg-gradient-to-r from-primary to-primary-light hover:shadow-glow-lg text-white font-semibold px-12 py-5 rounded-full transition-all duration-300 transform hover:scale-105 text-lg"
          >
            View Locations
          </Link>
        </div>
      </section>
    </div>
  )
}