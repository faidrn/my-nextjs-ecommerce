# My Next.js E-commerce

**My Next.js E-commerce** is an e-commerce application built with **Next.js** and **React**, featuring modern functionalities such as a shopping cart, product filters, and an admin panel to manage users, products, and categories.

---

## Table of Contents

- [Features](#features)  
- [Technologies](#technologies)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [License](#license)

---

## Features

- Product catalog with filters and search functionality.  
- Product detail pages with add-to-cart functionality.  
- Global cart management using React Context API.  
- Admin panel to manage:  
  - Products  
  - Categories  
  - Users  
- Responsive and modern design.  
- Support for multiple themes and languages.

---

## Technologies

- **Next.js** – React framework for web applications.  
- **React** – Library for building user interfaces.  
- **Context API** – Global state management (cart, theme, language, authentication).  
- **Tailwind CSS** – Utility-first CSS framework.  
- **Netlify** – For deploying the frontend.

---

## Installation

1. Clone the repository:  
```bash
git clone https://github.com/faidrn/my-nextjs-ecommerce.git
```

2. Enter the project folder:
```bash
cd my-nextjs-ecommerce
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Run the application in development mode:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser at <dev>http://localhost:3000</dev>.

## Usage

* Browse the store and add products to your cart.
* Access the Admin Panel to manage products, categories, and users (authentication required).
* Configure theme and language using the controls available in the navigation bar.

## Project Structure

```
my-nextjs-ecommerce/
│
├─ src/
│  ├─ app/                   # Main pages
│  ├─ components/            # UI and functional components
│  │  ├─ product/            # ProductCard, ProductDetail, ProductGrid
│  │  ├─ admin/              # Admin panel components
│  │  └─ ui/                 # Reusable UI components
│  ├─ context/               # Contexts (Cart, Theme, Language, Auth)
│
├─ public/                   # Static assets (images, icons)
├─ package.json               # Dependencies and scripts
└─ README.md
```

## Contributing
Contributions are welcome! To collaborate:

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit:
```bash
git commit -m "feat: description of the feature"
```

4. Push your branch and open a pull request.

## License
This project is licensed under the **MIT License**.

## Author
FAID – [GitHub](https://github.com/faidrn)