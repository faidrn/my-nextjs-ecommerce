"use client";
import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-semibold dark:text-white">ShopHub</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your one-stop shop for quality products at great prices.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold dark:text-white">
              {"aboutUs"}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-gray-900 dark:hover:text-white"
                >
                  {"aboutUs"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-gray-900 dark:hover:text-white"
                >
                  {"contact"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold dark:text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-gray-900 dark:hover:text-white"
                >
                  {"privacyPolicy"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-gray-900 dark:hover:text-white"
                >
                  {"termsOfService"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            © {currentYear} ShopHub. {"allRightsReserved"}.
          </p>
        </div>
      </div>
    </footer>
  );
}