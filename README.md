# E-Commerce Application Frontend

This repository contains the frontend code for our E-Commerce Application, a comprehensive online shopping platform built with React.js and Next.js.

## Technologies Used
 
- Next.js
- Axois
- TypeScript
- Tailwind CSS (for styling)

## Features

- User authentication (signup, login, password reset)
- Product browsing with advanced filtering and search
- Shopping cart functionality
- Checkout process with payment integration
- User profiles and order history
- Vendor dashboard for product management
- Admin panel for platform management
- Responsive design for mobile and desktop

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/abuhosain/premium-haat-frontend.git
   ```

2. Navigate to the project directory:
   ```
   cd premium-haat-frontend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env.local` file in the root directory and add the following environment variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

## Usage

To start the development server:

```
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```
npm run build
```

To start the production server:

```
npm start
```

## Contributing

We welcome contributions to improve the E-Commerce Application. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

 