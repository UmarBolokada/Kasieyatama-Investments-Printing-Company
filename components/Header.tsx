"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Form from "next/form";
import { usePathname } from "next/navigation";
import { ClerkLoaded, SignInButton, useUser } from "@clerk/nextjs";
import { PackageIcon, ShoppingBag, ChevronDownIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Category } from "@/lib/type";
import { getCategories } from "@/sanity/lib/data";
import { useCart } from "@/lib/contexts/CartContext";
import { urlFor } from "@/sanity/lib/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { user } = useUser();
  const {state} = useCart()
  const pathname = usePathname();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories()
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };
  // Close user menu when clicking outside
  React.useEffect(() => {
    if (!userMenuOpen) return;
    function handleClick(e: MouseEvent) {
      const dropdown = document.getElementById("user-dropdown");
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);

  // Close services dropdown when clicking outside
  React.useEffect(() => {
    if (!servicesDropdownOpen) return;
    function handleClick(e: MouseEvent) {
      const desktopDropdown = document.getElementById("desktop-services-dropdown");
      const mobileDropdown = document.getElementById("mobile-services-dropdown");
      const target = e.target as Node;
      
      if ((!desktopDropdown || !desktopDropdown.contains(target)) && 
          (!mobileDropdown || !mobileDropdown.contains(target))) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [servicesDropdownOpen]);

  // Close services dropdown when mobile menu closes
  React.useEffect(() => {
    if (!menuOpen) {
      setServicesDropdownOpen(false);
    }
  }, [menuOpen]);


  return (
    <header className="w-full bg-white shadow-md">
    {/* <header className="w-full bg-white shadow-md sticky top-0 z-50"> */}
      <div className="w-full pr-4 flex items-center justify-between h-18 gap-2">
        {/* Logo and Search */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Link href="/" className="flex items-center gap-1 text-xl font-bold text-primary shrink-0">
            <Image 
              src="/kas logo2.png" 
              alt="Printing Press Logo" 
              width={100} 
              height={100} 
              className="h-28 w-28 object-cover" 
              priority
            />
            {/* <Image src="/kas logo2.png" alt="Printing Press Logo" width={48} height={48} className="h-32 w-32 object-cover" /> */}
            {/* <span className="hidden sm:inline">Kasieyatama</span> */}
          </Link>
        </div>

        <nav className="hidden sm:flex items-center self-stretch gap-6 text-sm text-gray-600">
            <Link
              href="/"
              className={`transition-colors ${
                isActive("/")
                  ? "text-gray-900 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${
                isActive("/about")
                  ? "text-gray-900 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`transition-colors ${
                isActive("/contact")
                  ? "text-gray-900 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/products"
              className={`transition-colors ${
                isActive("/products")
                  ? "text-gray-900 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Products
            </Link>
            
            {/* Services Dropdown */}
            <div 
              id="desktop-services-dropdown"
              className="relative h-full flex items-center px-2"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`transition-colors flex items-center gap-1 ${
                  isActive("/services")
                    ? "text-gray-900 font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Services
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              
              {/* Desktop Dropdown Menu - Full Width with Images */}
              {servicesDropdownOpen && categories.length > 0 && (
                <div className="fixed top-16 left-0 right-0 w-full mt-1 bg-white border border-gray-200 rounded-bl-lg rounded-br-lg shadow-lg py-6 z-50">
                  <div className="px-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Services</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/category/${category.slug.current}`}
                          className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-16 h-16 mb-3 rounded-lg overflow-hidden bg-gray-100">
                            {category.image ? (
                              <Image
                                src={urlFor(category.image).width(64).height(64).url()}
                                alt={category.title}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <PackageIcon className="w-8 h-8" />
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-medium text-gray-900 text-center group-hover:text-primary transition-colors">
                      {category.title}
                          </span>
                    </Link>
                  ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      href="/services"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                        View All Services
                        <ChevronDownIcon className="w-4 h-4 ml-1 rotate-[-90deg]" />
                    </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-4">
           {/* Search Bar */}
           <form action="/search" method="get" className=" min-w-0 hidden sm:block">
            <input
            type="text"
              name="q"
              placeholder="Search products..."
              className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-gray-50"
            />
          </form>
        {/* <SignedIn> */}
        <Link href="/cart" className="px-4 py-2 relative rounded bg-primary text-white font-medium hover:bg-primary/90 transition flex items-center gap-2">
        <ShoppingBag className="w-4 h-4" />
        {state.items.length ? <span className="absolute -top-1 -right-1 bg-white border-black border text-black rounded-full text-xs px-[5px]">{state.items.length}</span>: null}
        <span className="text-sm">
        My Cart
        </span>
        </Link>
        {/* </SignedIn> */}

          <ClerkLoaded>
            <SignedIn>
          <Link href="/orders" className="px-4 py-2 rounded bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition flex items-center gap-2">
          <PackageIcon className="w-4 h-4" />
          <span>
          My Orders
          </span>
          </Link>
          </SignedIn>
          {user ? (
            <div className="relative flex items-center gap-2">
                <UserButton />
                <div className="flex flex-col leading-tight text-left">
                  <span className="text-xs text-gray-400">Welcome back</span>
                  <span className="text-sm font-semibold text-gray-800 truncate max-w-[100px]">{user.fullName}</span>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal">
            <p className="px-4 py-2 cursor-pointer rounded bg-primary text-white font-medium hover:bg-primary/90 transition">Login</p>
            </SignInButton>
          )}
          </ClerkLoaded>

        </div>
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary ml-2"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile/Tablet Menu */}
      {menuOpen &&  <nav className="sm:hidden flex items-center justify-center gap-4 text-sm text-gray-600">
            <Link
              href="/"
              className={`transition-colors ${
                isActive("/")
                  ? "text-gray-900 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${
                isActive("/about")
                  ? "text-gray-900 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`transition-colors ${
                isActive("/contact")
                  ? "text-gray-900 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/products"
              className={`transition-colors ${
                isActive("/products")
                  ? "text-gray-900 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Products
            </Link>
            
            {/* Mobile Services Dropdown */}
            <div id="mobile-services-dropdown" className="relative">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-1 transition-colors ${
                  isActive("/services")
                    ? "text-gray-900 font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Services
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {servicesDropdownOpen && categories.length > 0 && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/category/${category.slug.current}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {category.title}
                    </Link>
                  ))}
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <Link
                      href="/services"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      All Services
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pb-4 pt-2 flex flex-col gap-3">
          <Form action="/search" className="flex w-full">
            <input
              type="text"
              name="query"
              placeholder="Search products..."
              className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-gray-50"
            />
          </Form>
       {user ? <div className="flex gap-2">
        <Link href="/cart" className="px-4 py-2 rounded bg-primary text-white font-medium hover:bg-primary/90 transition flex items-center gap-2 basis-3/5 relative">
          <ShoppingBag className="w-4 h-4" />
          <span>
          My Cart
          </span>
          {state.items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white border-black border text-black rounded-full text-xs px-[5px]">
              {state.items.length}
            </span>
          )}
          </Link>
          <Link href="/orders" className="px-4 py-2 rounded bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition flex items-center gap-2 basis-3/5">
          <PackageIcon className="w-4 h-4" />
          <span>
          My Orders
          </span>
          </Link>
          <UserButton />
       </div>: <div className="flex flex-col gap-2">
            <Link href="/cart" className="px-4 py-2 rounded bg-primary text-white font-medium hover:bg-primary/90 transition flex items-center gap-2 relative">
              <ShoppingBag className="w-4 h-4" />
              <span>My Cart</span>
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white border-black border text-black rounded-full text-xs px-[5px]">
                  {state.items.length}
                </span>
              )}
            </Link>
            <SignInButton mode="modal">
              <p className="px-4 py-2 rounded bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition">Login</p>
            </SignInButton>
          </div>}
        </div>
      )}


    </header>
  );
}


