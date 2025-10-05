# FINBRIDGE - PSX Stock Screener

## Overview

FINBRIDGE is a sophisticated stock screening platform designed exclusively for the Pakistan Stock Exchange (PSX). The application provides investor-grade financial analysis tools, allowing users to filter and analyze the top 300 PSX stocks using 20+ financial indicators. The platform features risk-based filtering (low/medium/high), CAPM expected return calculations, and includes Pakistan's first Student Managed Investment Fund (SMIF) educational component.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and caching
- Shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Framer Motion for animations and transitions

**Design Decisions:**
- Component-based architecture with reusable UI components in `/client/src/components`
- Page-based routing structure in `/client/src/pages`
- Centralized utility functions for stock data calculations in `/client/src/lib`
- Custom hooks for mobile responsiveness and toast notifications
- Design system configuration through `components.json` and Tailwind config

### Backend Architecture

**Technology Stack:**
- Express.js server running on Node.js
- TypeScript for type safety across the stack
- Static JSON data source for PSX stock information (top 300 stocks)
- File-based data loading from `attached_assets/psx_top300_1759312394734.json`

**Design Decisions:**
- RESTful API architecture with routes defined in `/server/routes.ts`
- In-memory data processing (stocks loaded from JSON file on startup)
- Filtering and calculation logic performed server-side for consistency
- Risk profiling algorithm based on beta and debt/equity ratios
- CAPM (Capital Asset Pricing Model) calculations for expected returns
- Middleware for request logging and JSON parsing

**Key Endpoints:**
- `/api/stocks` - Returns all stocks
- `/api/stocks/filter` - POST endpoint for filtered stock results
- `/api/stocks/:symbol` - Individual stock details
- `/api/stocks/top/gainers` - Top gaining stocks
- `/api/stocks/top/active` - Most actively traded stocks
- `/api/presets/:level` - Risk preset configurations (low/medium/high)

### Data Storage Solutions

**Current Implementation:**
- Static JSON file storage for stock data (`psx_top300_1759312394734.json`)
- In-memory data structures for runtime filtering and calculations
- No persistent database currently configured

**Database Configuration (Drizzle ORM Ready):**
- Drizzle ORM configured for PostgreSQL via `drizzle.config.ts`
- Schema definition location: `/shared/schema.ts`
- Migration output directory: `/migrations`
- Database connection via `@neondatabase/serverless`
- Environment variable: `DATABASE_URL` (currently not utilized)

**Design Rationale:**
- Static data approach chosen for MVP with 300 pre-scraped stocks
- Drizzle configuration in place for future database integration
- Schema shared between client and server via `/shared` directory
- Zod schemas used for runtime validation and type inference

### Authentication and Authorization

**Current State:**
- No authentication system implemented
- Public access to all screening features
- Session management dependencies present (`connect-pg-simple`) but not configured

**Future Considerations:**
- Cookie-based sessions with `express-session` (dependencies installed)
- User preference storage capability via `/server/storage.ts` interface

### Data Processing & Business Logic

**Stock Filtering System:**
- 15+ filter criteria including market cap, P/E ratio, ROE, beta, debt/equity
- Risk level classification algorithm (low: beta<0.75 & D/E<0.5, high: beta>1.25 or D/E>1.5)
- Multi-dimensional filtering with min/max ranges for each indicator

**Financial Calculations:**
- CAPM expected return: E(R) = Rf + β(Rm - Rf)
- Default parameters: Rf=12.5% (6M T-Bill), Rm=15.2% (KSE-100 expected return)
- Ratio extraction from nested stock data structure
- Market cap parsing with T/B/M suffix support (PKR currency)

**Key Features:**
- Real-time client-side calculations with server-side validation
- Stale-while-revalidate caching strategy via TanStack Query
- Smart polling disabled (static data source)
- Risk preset configurations for quick filtering

## External Dependencies

### Third-Party Services

**Data Source:**
- Stock data scraped from stockanalysis.com (PSX section)
- Python scraper script included: `attached_assets/300scraper_1759312394733.py`
- Manual data refresh process (no automated updates)

### APIs and Integrations

**Market Data:**
- No real-time API integration (static JSON data)
- KSE-100 index values hardcoded in UI components
- Future integration capability with PSX data feeds

### Database

**PostgreSQL via Neon:**
- Connection configured through `@neondatabase/serverless`
- Drizzle ORM for schema management and queries
- Migration system ready (`npm run db:push`)
- Currently unused - data served from JSON file

### Development Tools

**Replit Integration:**
- Custom Vite plugins for Replit environment
- Runtime error overlay (`@replit/vite-plugin-runtime-error-modal`)
- Cartographer plugin for development navigation
- Dev banner for environment indication

### UI Component Library

**Shadcn/ui Ecosystem:**
- 40+ pre-built accessible components
- Radix UI primitives for headless component logic
- CVA (class-variance-authority) for variant styling
- Custom component configuration via `components.json`

### Additional Libraries

**Financial & Data Visualization:**
- Recharts for stock price charts and performance graphs
- date-fns for date formatting and manipulation
- Embla Carousel for image/content carousels

**Form Management:**
- React Hook Form with Zod resolver for validation
- Type-safe form schemas using Drizzle-Zod integration

**Utilities:**
- clsx and tailwind-merge for className management
- cmdk for command palette functionality
- Lucide React for icon system