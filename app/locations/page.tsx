import { getLocations } from '@/lib/cosmic'
import { Location } from '@/types'

export default async function LocationsPage() {
  const locations = await getLocations() as Location[]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Showrooms</h1>
          <p className="text-gray-400 text-lg">
            Visit us at our premier locations
          </p>
        </div>

        {locations && locations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((location) => (
              <div key={location.id} className="bg-secondary-light rounded-lg overflow-hidden">
                {location.metadata.location_image && (
                  <img
                    src={`${location.metadata.location_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                    alt={location.metadata.location_name}
                    className="w-full h-64 object-cover"
                    width="600"
                    height="300"
                  />
                )}
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    {location.metadata.location_name}
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-gray-400 text-sm font-semibold mb-1">Address</h3>
                      <p className="whitespace-pre-line">{location.metadata.address}</p>
                    </div>
                    
                    {location.metadata.phone && (
                      <div>
                        <h3 className="text-gray-400 text-sm font-semibold mb-1">Phone</h3>
                        <a 
                          href={`tel:${location.metadata.phone}`}
                          className="text-primary hover:text-primary-dark"
                        >
                          {location.metadata.phone}
                        </a>
                      </div>
                    )}
                    
                    {location.metadata.email && (
                      <div>
                        <h3 className="text-gray-400 text-sm font-semibold mb-1">Email</h3>
                        <a 
                          href={`mailto:${location.metadata.email}`}
                          className="text-primary hover:text-primary-dark"
                        >
                          {location.metadata.email}
                        </a>
                      </div>
                    )}
                    
                    {location.metadata.hours && (
                      <div>
                        <h3 className="text-gray-400 text-sm font-semibold mb-1">Hours</h3>
                        <p className="whitespace-pre-line text-sm">{location.metadata.hours}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No locations available at this time.</p>
          </div>
        )}
      </div>
    </div>
  )
}