# DrLabike Backend Setup

## Environment Variables

Create a `.env` file in the Backend folder with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/drlabike
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

## API Endpoints

- **POST /api/inquiry** - Contact form submission
- **GET /api/health** - Health check

## Database

The backend uses MongoDB. Make sure you have MongoDB running locally or update the MONGO_URI to point to your MongoDB instance. 