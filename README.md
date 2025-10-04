# Tech-vault

**Live URL:** [[Add your live URL here](https://tech-vault-web.netlify.app/)]

## 🎯 Project Purpose
Tech-vault is a modern tech platform where users can discover, share, and interact with tech products such as Web Apps, AI tools, Software, Games, and Mobile Apps. It is inspired by platforms like [Product Hunt](https://producthunt.com) and allows users to submit products, upvote or downvote them, post reviews, and access premium features through subscription payments.  

This project is designed for Junior MERN Stack Developers to showcase full-stack skills using **MongoDB, Express.js, React.js, Node.js, Firebase**, and other modern tools.

## 🏆 Key Features

### User Roles
- **Normal Users**
  - Browse and view tech products.
  - Submit new products for review.
  - Upvote and report products.
- **Moderators**
  - Review and approve/reject submitted products.
  - Handle reported products.
  - Mark products as featured.
- **Admins**
  - Manage user roles.
  - Monitor site activities through statistics.
  - Manage coupons.

### Authentication & Authorization
- JWT-based authentication to secure private routes.
- Login/Registration with Email & Google Authentication (Firebase).
- Private route access for dashboard, product management, and admin pages.

### Frontend Features
- Responsive design with **Tailwind CSS** for mobile, tablet, and desktop.
- Banner/Slider/Carousel for homepage.
- Featured & Trending Products sections with dynamic cards.
- Product Details page with reviews, upvotes, and report functionality.
- User Dashboard with:
  - My Profile
  - Add Product
  - My Products
- Moderator Dashboard with:
  - Product Review Queue
  - Reported Contents
- Admin Dashboard with:
  - Statistics Page (pie chart)
  - Manage Users
  - Manage Coupons

### Other Functionalities
- Search & pagination in products page (6 cards per page).
- Stripe payment integration for membership/subscription.
- Coupon management and carousel advertising for promotions.
- Optional features: down-vote, rising products slider, Framer Motion animations, loading spinners.

## 📦 npm Packages Used

### Frontend
- `react`, `react-dom`, `react-router`
- `tailwindcss`
- `clsx`, `class-variance-authority`
- `react-hook-form`, `react-helmet`
- `react-icons`, `lucide-react`
- `swiper`
- `sweetalert2`, `date-fns`
- `@stripe/react-stripe-js`, `@stripe/stripe-js`
- `motion`, `axios`

### Backend
- `express`, `cors`, `mongodb`, `jsonwebtoken`, `stripe`, `envdot`
[Backend Repo Link](https://github.com/coder-khayrul/tech-vault-server)
