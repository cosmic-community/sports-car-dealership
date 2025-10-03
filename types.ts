// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Vehicle condition type literal
export type VehicleCondition = 'new' | 'certified' | 'used';

// Transmission type literal
export type TransmissionType = 'manual' | 'automatic' | 'dct' | 'cvt';

// Drivetrain type literal
export type DrivetrainType = 'rwd' | 'awd' | 'fwd';

// Fuel type literal
export type FuelType = 'gasoline' | 'diesel' | 'electric' | 'hybrid';

// Brand interface
export interface Brand extends CosmicObject {
  type: 'brands';
  metadata: {
    brand_name: string;
    logo?: {
      url: string;
      imgix_url: string;
    };
    description?: string;
    country?: string;
  };
}

// Location interface
export interface Location extends CosmicObject {
  type: 'locations';
  metadata: {
    location_name: string;
    address: string;
    phone?: string;
    email?: string;
    hours?: string;
    location_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Vehicle interface
export interface Vehicle extends CosmicObject {
  type: 'vehicles';
  metadata: {
    make: string;
    model: string;
    year: number;
    vin?: string;
    price: number;
    mileage: number;
    condition: {
      key: VehicleCondition;
      value: string;
    };
    exterior_color?: string;
    interior_color?: string;
    horsepower?: number;
    engine_displacement?: number;
    transmission?: {
      key: TransmissionType;
      value: string;
    };
    drivetrain?: {
      key: DrivetrainType;
      value: string;
    };
    fuel_type?: {
      key: FuelType;
      value: string;
    };
    description?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    brand?: Brand;
    location?: Location;
    available?: boolean;
    featured?: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guards
export function isVehicle(obj: CosmicObject): obj is Vehicle {
  return obj.type === 'vehicles';
}

export function isBrand(obj: CosmicObject): obj is Brand {
  return obj.type === 'brands';
}

export function isLocation(obj: CosmicObject): obj is Location {
  return obj.type === 'locations';
}