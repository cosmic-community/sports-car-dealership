import { getLocations } from '@/lib/cosmic'
import { Location } from '@/types'

export default async function LocationsPage() {
  const locations = await getLocations() as Location[]

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">Our Showrooms</h1>
          <p className="text-gray-400 text-xl font-light">
            Visit us at our premier locations
          </p>
        </div>

        {locations && locations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((location) => (
              <div key={location.id} className="bg-secondary-light rounded-2xl overflow-hidden card-hover border border-gray-800">
                {location.metadata.location_image && (
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={`${location.metadata.location_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                      alt={location.metadata.location_name}
                      className="w-full h-full object-cover"
                      width="600"
                      height="300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                )}
                <div className="p-10">
                  <h2 className="text-3xl font-bold mb-6 gradient-text">
                    {location.metadata.location_name}
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">Address</h3>
                      <p className="whitespace-pre-line text-gray-200">{location.metadata.address}</p>
                    </div>
                    
                    {location.metadata.phone && (
                      <div>
                        <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">Phone</h3>
                        <a 
                          href={`tel:${location.metadata.phone}`}
                          className="text-primary hover:text-primary-light font-medium transition-colors"
                        >
                          {location.metadata.phone}
                        </a>
                      </div>
                    )}
                    
                    {location.metadata.email && (
                      <div>
                        <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">Email</h3>
                        <a 
                          href={`mailto:${location.metadata.email}`}
                          className="text-primary hover:text-primary-light font-medium transition-colors"
                        >
                          {location.metadata.email}
                        </a>
                      </div>
                    )}
                    
                    {location.metadata.hours && (
                      <div>
                        <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">Hours</h3>
                        <p className="whitespace-pre-line text-sm text-gray-300 leading-relaxed">{location.metadata.hours}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-secondary-light rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-lg">No locations available at this time.</p>
          </div>
        )}
      </div>
    </div>
  )
}