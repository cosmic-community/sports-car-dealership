// app/vehicles/[slug]/page.tsx
import { getVehicleBySlug, getVehicles } from '@/lib/cosmic'
import { Vehicle } from '@/types'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export async function generateStaticParams() {
  const vehicles = await getVehicles() as Vehicle[]
  
  return vehicles.map((vehicle) => ({
    slug: vehicle.slug,
  }))
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const vehicle = await getVehicleBySlug(slug) as Vehicle | null

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Vehicle Not Found</h1>
          <Link href="/vehicles" className="text-primary hover:text-primary-dark">
            Back to Inventory
          </Link>
        </div>
      </div>
    )
  }

  const featuredImage = vehicle.metadata.featured_image
  const gallery = vehicle.metadata.gallery || []
  const brand = vehicle.metadata.brand
  const location = vehicle.metadata.location

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/vehicles"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          ← Back to Inventory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            {featuredImage && (
              <div className="mb-4">
                <img
                  src={`${featuredImage.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                  alt={vehicle.title}
                  className="w-full h-auto rounded-lg"
                  width="600"
                  height="400"
                />
              </div>
            )}
            
            {gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {gallery.map((image, index) => (
                  <img
                    key={index}
                    src={`${image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                    alt={`${vehicle.title} - Image ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                    width="300"
                    height="200"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              {brand && (
                <Link 
                  href={`/brands/${brand.slug}`}
                  className="text-primary hover:text-primary-dark text-sm font-semibold mb-2 inline-block"
                >
                  {brand.metadata.brand_name}
                </Link>
              )}
              <h1 className="text-4xl font-bold mb-2">{vehicle.title}</h1>
              <div className="flex items-center gap-4 text-gray-400">
                <span className="px-3 py-1 bg-secondary-light rounded-full text-sm">
                  {vehicle.metadata.condition.value}
                </span>
                {vehicle.metadata.available ? (
                  <span className="text-green-500">Available</span>
                ) : (
                  <span className="text-red-500">Sold</span>
                )}
              </div>
            </div>

            <div className="text-3xl font-bold text-primary mb-8">
              ${vehicle.metadata.price.toLocaleString()}
            </div>

            {/* Specifications */}
            <div className="bg-secondary-light rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Year</p>
                  <p className="font-semibold">{vehicle.metadata.year}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mileage</p>
                  <p className="font-semibold">{vehicle.metadata.mileage.toLocaleString()} miles</p>
                </div>
                {vehicle.metadata.exterior_color && (
                  <div>
                    <p className="text-gray-400 text-sm">Exterior Color</p>
                    <p className="font-semibold">{vehicle.metadata.exterior_color}</p>
                  </div>
                )}
                {vehicle.metadata.interior_color && (
                  <div>
                    <p className="text-gray-400 text-sm">Interior Color</p>
                    <p className="font-semibold">{vehicle.metadata.interior_color}</p>
                  </div>
                )}
                {vehicle.metadata.horsepower && (
                  <div>
                    <p className="text-gray-400 text-sm">Horsepower</p>
                    <p className="font-semibold">{vehicle.metadata.horsepower} HP</p>
                  </div>
                )}
                {vehicle.metadata.engine_displacement && (
                  <div>
                    <p className="text-gray-400 text-sm">Engine</p>
                    <p className="font-semibold">{vehicle.metadata.engine_displacement}L</p>
                  </div>
                )}
                {vehicle.metadata.transmission && (
                  <div>
                    <p className="text-gray-400 text-sm">Transmission</p>
                    <p className="font-semibold">{vehicle.metadata.transmission.value}</p>
                  </div>
                )}
                {vehicle.metadata.drivetrain && (
                  <div>
                    <p className="text-gray-400 text-sm">Drivetrain</p>
                    <p className="font-semibold">{vehicle.metadata.drivetrain.value}</p>
                  </div>
                )}
                {vehicle.metadata.fuel_type && (
                  <div>
                    <p className="text-gray-400 text-sm">Fuel Type</p>
                    <p className="font-semibold">{vehicle.metadata.fuel_type.value}</p>
                  </div>
                )}
                {vehicle.metadata.vin && (
                  <div className="col-span-2">
                    <p className="text-gray-400 text-sm">VIN</p>
                    <p className="font-semibold font-mono text-sm">{vehicle.metadata.vin}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            {location && (
              <div className="bg-secondary-light rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <p className="font-semibold mb-2">{location.metadata.location_name}</p>
                <p className="text-gray-400 whitespace-pre-line mb-2">{location.metadata.address}</p>
                {location.metadata.phone && (
                  <p className="text-gray-400">Phone: {location.metadata.phone}</p>
                )}
              </div>
            )}

            {/* Description */}
            {vehicle.metadata.description && (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{vehicle.metadata.description}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}