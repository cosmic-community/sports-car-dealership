# 🏎️ Elite Sports Car Dealership

![App Preview](https://imgix.cosmicjs.com/3be29420-a009-11f0-8c2f-71055d67fae4-photo-1583121274602-3e2820c69888-1759462196703.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A premium luxury sports car dealership platform built with Next.js 15 and powered by Cosmic CMS. Browse exotic vehicles from Ferrari, Porsche, Lamborghini, and other prestigious manufacturers across multiple showroom locations.

## Features

- 🏎️ **Premium Vehicle Showcase** - Browse luxury sports cars with detailed specifications
- 🔍 **Advanced Filtering** - Search by brand, condition, price range, and technical specs
- 🏢 **Brand Pages** - Explore manufacturer heritage and complete vehicle lineups
- 📍 **Multi-Location Support** - View inventory across Beverly Hills and Miami Beach showrooms
- 📱 **Fully Responsive** - Optimized experience across desktop, tablet, and mobile devices
- ⚡ **Real-Time Updates** - Inventory synced with Cosmic CMS for instant availability
- 🖼️ **Image Galleries** - High-resolution vehicle photography with imgix optimization
- 📄 **Rich Content** - Markdown-powered descriptions with detailed vehicle information

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68df4248260d9dd939d1b26c&clone_repository=68df44d7260d9dd939d1b28c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a prompt to build the content model for a sports car dealership website"

### Code Generation Prompt

> "Based on the content model I created for 'Build a sports car dealership website', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **Bun** - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with your sports car dealership bucket

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd elite-sports-car-dealership
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file in the root directory:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Vehicles with Related Data

```typescript
// Fetch all vehicles with brand and location relationships
const response = await cosmic.objects
  .find({ type: 'vehicles' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);

const vehicles = response.objects;
```

### Filtering by Brand

```typescript
// Get all Ferrari vehicles
const response = await cosmic.objects
  .find({ 
    type: 'vehicles',
    'metadata.brand': brandId // Use brand ID, not slug
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Featured Vehicles

```typescript
// Get featured vehicles only
const response = await cosmic.objects
  .find({ 
    type: 'vehicles',
    'metadata.featured': true
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

## Cosmic CMS Integration

This application uses Cosmic CMS with the following content structure:

### Object Types

1. **Vehicles** - Main inventory with specifications, pricing, and images
   - Relationships: Brand (object), Location (object)
   - Key fields: make, model, year, price, mileage, condition, featured_image, gallery

2. **Brands** - Automotive manufacturers
   - Key fields: brand_name, logo, description, country

3. **Locations** - Showroom information
   - Key fields: location_name, address, phone, email, hours, location_image

### Content Relationships

- Vehicles connect to Brands via object metafield
- Vehicles connect to Locations via object metafield
- Use `depth(1)` parameter to fetch related data in a single query

## Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

## Project Structure

```
elite-sports-car-dealership/
├── app/
│   ├── vehicles/
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Individual vehicle pages
│   │   └── page.tsx               # Vehicle inventory listing
│   ├── brands/
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Brand detail pages
│   │   └── page.tsx               # Brand showcase
│   ├── locations/
│   │   └── page.tsx               # Showroom locations
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage
│   └── globals.css                # Global styles
├── components/
│   ├── VehicleCard.tsx           # Vehicle display card
│   ├── VehicleFilters.tsx        # Filter controls
│   ├── BrandCard.tsx             # Brand showcase card
│   ├── Navigation.tsx            # Main navigation
│   └── CosmicBadge.tsx          # Cosmic branding
├── lib/
│   └── cosmic.ts                 # Cosmic SDK configuration
├── types.ts                      # TypeScript definitions
└── package.json
```

## Learn More

- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

<!-- README_END -->