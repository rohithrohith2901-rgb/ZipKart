# ZipKart 🛒

A modern, production-ready online grocery shopping frontend built with **Next.js 15**, **Tailwind CSS v4**, and **Framer Motion**.

## Features

- ⚡ **Superfast Performance**: Built on Next.js App Router.
- 🎨 **Modern UI**: Clean, minimal design inspired by Blinkit/Zepto.
- 🛒 **Full Cart System**: Add/remove items, quantity updates, real-time totals.
- 📱 **Mobile First**: Responsive layout with sticky navigation and drawers.
- 🔍 **Search & Filter**: Instantly filter by category or search term.
- 💸 **Bill Breakdown**: Detailed GST, delivery fee, and grand total calculation.

## Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Toast Notifications**: Sonner

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

- `src/app`: App Router pages and layout.
- `src/components`: Reusable UI components.
  - `ui/`: Basic building blocks (Cards, Buttons).
  - `layout/`: Navbar, Footer.
  - `features/`: Complex features (CartDrawer).
- `src/context`: Global state (CartContext).
- `src/data`: Mock product data.
- `src/lib`: Utilities (clsx/tailwind-merge).
