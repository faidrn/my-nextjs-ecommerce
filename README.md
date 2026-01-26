# 🛒 My Next.js Ecommerce

A modern **ecommerce web application built with Next.js** that includes a full shopping experience: product catalog, filters, cart, authentication, and checkout flow. This project is designed both as a **realistic ecommerce demo** and as a **learning project** showcasing best practices with modern frontend tools.

🔗 **Live Demo:** https://my-nextjs-ecommerce.netlify.app/

---

## ✨ Key Features

- 🛍️ Product catalog with categories and filters
- 🔎 Product detail pages
- 🛒 Shopping cart (add, remove, update quantities)
- 👤 User authentication
- 💳 Checkout flow
- 🧑‍💼 Admin-style product management (UI-level)
- ⚡ Built with performance and scalability in mind

![](https://raw.githubusercontent.com/faidrn/my-portfolio/refs/heads/main/public/images/blog/my-nextjs-ecommerce/homepage.png)
---

## 🧪 Tech Stack

- **Next.js** – React framework for production
- **React** – UI development
- **TypeScript / JavaScript** – Application logic
- **CSS / Tailwind (if applicable)** – Styling
- **Platzi Fake Store API** – Product and user data

🔗 API Reference: https://fakeapi.platzi.com/en

---

## 🚀 Live Preview

You can try the application here:

👉 **https://my-nextjs-ecommerce.netlify.app/**


![](https://raw.githubusercontent.com/faidrn/my-portfolio/refs/heads/main/public/images/blog/my-nextjs-ecommerce/product-listing.png)
---

## 🔐 Authentication Flow

The application supports **user authentication** using the Platzi Fake Store API.

### How it works:
1. User navigates to the login page
2. Credentials are sent to the API
3. On success, a token/session is stored
4. Authenticated users can proceed to checkout


![](https://raw.githubusercontent.com/faidrn/my-portfolio/refs/heads/main/public/images/blog/my-nextjs-ecommerce/admin-dashboard.png)
---

## 🛒 Checkout Flow

The checkout process follows a simple and clear flow:

1. User adds products to the cart
2. Cart page shows selected items and total price
3. Authenticated users can continue to checkout
4. Order summary is displayed before confirmation

![](https://raw.githubusercontent.com/faidrn/my-portfolio/refs/heads/main/public/images/blog/my-nextjs-ecommerce/cart.png)
---

## 📦 Project Structure

```
my-nextjs-ecommerce/
├── components/    # Reusable UI components
├── pages/         # Next.js pages and routes
├── services/      # API and data handling
├── styles/        # Global and component styles
├── utils/         # Helper functions
└── public/        # Static assets
```

---

## 🛠️ Installation & Local Development

Clone the repository:

```bash
git clone https://github.com/faidrn/my-nextjs-ecommerce.git
cd my-nextjs-ecommerce
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open your browser at:

```
http://localhost:3000
```

---

## 📚 Learning Goals

This project is useful if you want to learn:

- How to build an ecommerce with Next.js
- Client-side state management for carts
- API consumption in React apps
- Authentication and protected flows
- Structuring a scalable frontend project

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

This project is open source and available under the **MIT License**.

