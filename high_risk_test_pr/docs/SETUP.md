/**
 * Setup and Installation Guide
 * Getting started with the project
 */

# Setup Guide

## Prerequisites

- Node.js 16+ 
- npm 8+ or yarn 3+
- Git

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourorg/project.git
cd project
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=7d
LOG_LEVEL=debug
```

### 4. Database Setup
```bash
npm run db:migrate
npm run db:seed
```

## Development

### Start Development Server
```bash
npm run dev
```

Server runs on `http://localhost:3000`

### Run Tests
```bash
npm test
npm run test:coverage
```

### Linting
```bash
npm run lint
npm run lint:fix
```

### Type Checking
```bash
npm run type-check
```

## Build

### Production Build
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

## Project Structure

```
project/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── context/        # React Context providers
│   ├── store/          # Redux store setup
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript types
│   ├── middleware/     # Express middleware
│   └── index.ts        # App entry point
├── tests/              # Test files
├── config/             # Configuration files
├── docs/               # Documentation
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm test` - Run tests
- `npm run lint` - Check code style
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run type-check` - Check TypeScript types
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with test data

## Troubleshooting

### Port already in use
```bash
# Change PORT in .env.local or kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database connection error
- Check DATABASE_URL in .env.local
- Ensure PostgreSQL is running
- Verify credentials

### Module not found error
```bash
rm -rf node_modules
npm install
```

## Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes and test locally
3. Commit: `git commit -m "feat: description"`
4. Push: `git push origin feature/name`
5. Open Pull Request

## Support

For issues and questions, open a GitHub issue or contact the team.
