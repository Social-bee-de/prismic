# Prismic Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Prismic Configuration](#prismic-configuration)
4. [Content Types](#content-types)
5. [Slices](#slices)
6. [Components](#components)
7. [Internationalization](#internationalization)
8. [API Routes](#api-routes)
9. [Assets and Public Files](#assets-and-public-files)
10. [Project Setup & Development](#project-setup--development)
11. [Deployment](#deployment)

## Project Overview

This project is a Next.js application integrated with Prismic CMS. It appears to be a multi-lingual website with various content sections including hiring, fundraising, and general content pages. The project leverages Prismic's slicemachine for content modeling and management.

### Key Technologies
- **Frontend Framework**: Next.js (App Router)
- **CMS**: Prismic
- **Styling**: Tailwind CSS
- **Language Support**: Multi-language (English and German)
- **UI Components**: Custom components + Flowbite

## Project Structure

The project follows a standard Next.js App Router structure with Prismic integration:

```
├── customtypes/      # Prismic content type definitions
├── docs/             # Project documentation
├── public/           # Static assets
├── src/
│   ├── actions/      # Server actions for form submissions
│   ├── app/          # Next.js app router pages
│   ├── components/   # Reusable UI components
│   ├── dictionaries/ # Language dictionaries
│   ├── hooks/        # Custom React hooks
│   ├── i18n/         # Internationalization configuration
│   ├── lib/          # Utility functions
│   ├── schemas/      # Schema definitions
│   ├── sections/     # Page sections components
│   ├── slices/       # Prismic slice components
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Helper utilities
```

## Prismic Configuration

The project uses Prismic as its headless CMS. Configuration is managed via:

- `slicemachine.config.json` - Main Prismic configuration file
- `prismicio.ts` - Prismic client setup and helper functions
- `customtypes/` - Content type definitions for Prismic

### Main Configuration Files

- `prismicio.ts`: Sets up the Prismic client and defines helper functions for fetching content
- `middleware.ts`: Handles Prismic preview sessions and language redirects

## Content Types

The project defines several custom types in the `customtypes/` directory:

1. **Navigation** (`customtypes/navigation/`):
   - Manages site navigation structure
   - Configuration in `index.json` with mocks in `mocks.json`

2. **Page** (`customtypes/page/`):
   - General content pages
   - Flexible content using slices

3. **Project** (`customtypes/project/`):
   - Project-specific content type

4. **Settings** (`customtypes/settings/`):
   - Site-wide settings and configuration

## Slices

The project contains a comprehensive set of slices for building page content. Each slice is defined in the `src/slices/` directory and follows the structure:

```
SliceName/
  ├── index.tsx       # Main component
  ├── model.json      # Slice model definition
  ├── mocks.json      # Mock data for slice
  └── screenshot-*.png # Preview screenshots
```

### Available Slices

- **Basic Content**:
  - `Text`: Simple text content
  - `Image`: Image display
  - `Quote`: Quote display
  - `Divider`: Visual page divider
  - `SEO`: SEO metadata

- **Layout Components**:
  - `Hero`: Hero section
  - `HeroSection`: Alternative hero section with client components
  - `CallToAction`: CTA blocks
  - `ImageWithText`: Combined image and text layouts
  - `TextWithImage`: Text with image (alternative layout)
  - `SectionBox`: Boxed section container

- **Complex Components**:
  - `BoxesList`: List displayed as boxes
  - `CompanyCarousel`: Carousel of company logos
  - `CustomerLogos`: Display of customer/partner logos
  - `Faq`: FAQ accordions
  - `Question`: Q&A components
  - `ProcessSection`: Step-by-step process display
  - `ImageCards`: Cards with images

- **Specialized Sections**:
  - `ChanceSection`: Section about opportunities
  - `DiversitySection`: Content about diversity
  - `FeedbackSection`: User feedback display
  - `TalentSection`: Talent showcase
  - `TalentsNumbers`: Statistics about talents

## Components

The project has several reusable components in `src/components/`:

- `Bounded.tsx`: Container with controlled width and padding
- `Heading.tsx`: Typography component for headings
- `PrismicRichText.tsx`: Renderer for Prismic Rich Text fields
- `SEO.tsx`: SEO meta tags component
- `LanguageDetector.tsx`: Language detection and switching
- `dropdown/dropdown.tsx`: Dropdown menu component
- `flowbite/init.tsx`: Initialization for Flowbite components

## Sections

The project organizes page sections in `src/sections/`, grouped by page type:

- **General**:
  - `carousel-section.tsx`: General carousel component
  - `header-section.tsx`: Main header component
  - `header-section-mobile.tsx`: Mobile-specific header
  - `language-selector.tsx`: Language switching component

- **Footer**:
  - `Footer/Footer.tsx`: Main footer component
  - `Footer/links.ts`: Footer link definitions

- **Home**:
  - `home/alumni-section.tsx`: Alumni showcase
  - `home/female-accelerator-program.tsx`: Female program highlights
  - `home/sucess-story-section.tsx`: Success stories display

- **Hiring**:
  - `hiring/company-carousel-section.tsx`: Partner companies carousel
  - `hiring/diversity-section.tsx`: Diversity initiatives
  - `hiring/faq-section.tsx`: FAQ about hiring
  - `hiring/program-section.tsx`: Program details
  - `hiring/talents-section.tsx`: Talent showcase

- **Fundraising**:
  - `fundraising/contact-section.tsx`: Contact information
  - `fundraising/partner-section.tsx`: Partners display
  - `fundraising/gift-card/`: Gift card and donation related components

## Internationalization

The project supports multiple languages through:

- **Language Configuration**:
  - `src/i18n/settings.ts`: Language settings and configuration
  - `src/i18n/server.ts`: Server-side internationalization utilities

- **Dictionaries**:
  - `src/dictionaries/en-us.json`: English content
  - `src/dictionaries/de.json`: German content

- **Translations**:
  - `src/i18n/locales/en/translation.json`: English translations
  - `src/i18n/locales/de/translation.json`: German translations

- **Language Detection and Switching**:
  - `src/components/LanguageDetector.tsx`: Language detection
  - `src/actions/changeLanguage.tsx`: Server action for language switching
  - Language is addressed in the middleware (`middleware.ts`)

## API Routes

API routes are defined in `src/app/api/`:

- **Prismic Preview** (`api/preview/route.ts`):
  - Enables Prismic preview functionality

- **Exit Preview** (`api/exit-preview/route.ts`):
  - Exits Prismic preview mode

- **Revalidation** (`api/revalidate/route.ts`):
  - On-demand revalidation of pages

## Assets and Public Files

The project includes various static assets in the `public/` directory:

- **Images**:
  - Homepage assets in `public/home/`
  - Logo files in `public/logos/`
  - Press materials in `public/press/`

- **Icons**:
  - Android icons in `public/android/`
  - iOS icons in `public/ios/`
  - Windows icons in `public/windows11/`

- **Fonts**:
  - Apercu font files in `public/fonts/`

- **PWA Support**:
  - `manifest.json`: Progressive Web App manifest
  - `sw.js`: Service worker
  - `workbox-*.js`: Workbox service worker library

## Server Actions

The project uses Next.js Server Actions for form handling:

- `src/actions/saveAppointment.tsx`: Handle appointment bookings
- `src/actions/saveMessage.tsx`: Save contact form messages
- `src/actions/changeLanguage.tsx`: Handle language switching

## Project Setup & Development

### Prerequisites
- Node.js (version specified in package.json)
- Yarn or NPM
- Prismic account with proper repository setup

### Installation
```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Start Slice Machine (for Prismic content modeling)
yarn slicemachine
```

### Environment Variables
Create a `.env.local` file with the following variables:
```
NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME=your-repository-name
PRISMIC_API_TOKEN=your-prismic-api-token
PRISMIC_ACCESS_TOKEN=your-prismic-access-token
```

## Deployment

The project appears to be set up for deployment with support for Progressive Web App features.

### PWA Support
- Service worker setup in `src/service-worker/app-worker.ts`
- Manifest in `public/manifest.json`
- Various icon sizes for different platforms

### Build for Production
```bash
# Build the project
yarn build

# Start production server
yarn start
```

## Conclusion

This Prismic-based Next.js project provides a flexible, multi-language website with rich content management capabilities. The combination of Prismic's slicemachine for content modeling and Next.js for frontend rendering creates a powerful and maintainable web application.

For specific implementation details, refer to the individual component files and Prismic custom type definitions.