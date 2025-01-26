import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">MinimalStore</h3>
            <p className="text-sm text-gray-600">Your one-stop shop for minimalist products.</p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h4 className="text-md font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-md font-semibold mb-2">Connect With Us</h4>
            <p className="text-sm text-gray-600 mb-2">Follow us on social media:</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © 2023 MinimalStore. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

