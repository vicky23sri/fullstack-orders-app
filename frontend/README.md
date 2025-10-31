# Orders Management Frontend

A Next.js-based frontend application for managing orders with a modern, responsive UI.

## Features

- **Dashboard**: Overview of orders and statistics
- **Orders Management**: Create, view, and search orders
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Automatic refresh after order creation
- **Pagination**: Efficient data browsing
- **Search**: Filter orders by customer information

## Tech Stack

- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS (Styling)
- ShadcnUI (UI components)
- React Hook Form (Form management)
- Zod (Schema validation)
- Axios (API client)

## Local Development Setup

### Prerequisites

- Node.js 18+
- Backend API running on port 3001

### Installation

1. Navigate to frontend directory:
```bash
   cd frontend
   npm install
```

2. Set up environment variables:
```bash
   cp .env.local.example .env.local
```
   
   Update `.env.local`:
```
   NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. Start the development server:
```bash
   npm run dev
```

The application will be available at `http://localhost:3000`

### Project Structure
```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
│   └── orders/         # Order-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and API clients
│   └── api/           # API client functions
├── types/              # TypeScript type definitions
└── components/ui/      # ShadcnUI components
```

### Key Features

- **Dashboard**: Overview with statistics and recent orders
- **Orders Page**: Full orders management with search and pagination
- **Create Order**: Multi-item order creation with product selection
- **Responsive Design**: Works on desktop, tablet, and mobile

## Deployment

### Environment Variables for Production
```
NEXT_PUBLIC_API_URL=your_production_backend_url
```

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Build
```bash
npm run build
npm run start
```

## Trade-offs and Shortcuts

1. **State Management**: Using local state instead of Redux/Zustand
2. **Error Handling**: Basic error handling, could be more user-friendly
3. **Loading States**: Basic loading indicators
4. **Offline Support**: No offline functionality
5. **Testing**: No tests implemented due to time constraints
6. **SEO**: Basic SEO optimization
7. **Accessibility**: Basic accessibility, could be improved