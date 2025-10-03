import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all vehicles with related data
export async function getVehicles() {
  try {
    const response = await cosmic.objects
      .find({ type: 'vehicles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch vehicles');
  }
}

// Fetch single vehicle by slug
export async function getVehicleBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'vehicles', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch vehicle');
  }
}

// Fetch featured vehicles
export async function getFeaturedVehicles() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'vehicles',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured vehicles');
  }
}

// Fetch all brands
export async function getBrands() {
  try {
    const response = await cosmic.objects
      .find({ type: 'brands' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch brands');
  }
}

// Fetch single brand by slug
export async function getBrandBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'brands', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch brand');
  }
}

// Fetch vehicles by brand ID
export async function getVehiclesByBrand(brandId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'vehicles',
        'metadata.brand': brandId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch vehicles by brand');
  }
}

// Fetch all locations
export async function getLocations() {
  try {
    const response = await cosmic.objects
      .find({ type: 'locations' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch locations');
  }
}