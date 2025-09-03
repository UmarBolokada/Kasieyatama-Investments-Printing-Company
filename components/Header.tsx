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
import { urlFor } from "@/sanity/lib/image";
import { useCart } from "@/lib/contexts/CartContext";

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

  return (
    <header className="w-full bg-white shadow-md">
    {/* <header className="w-full bg-white shadow-md sticky top-0 z-50"> */}
      <div className="w-full mx-2 px-4 sm:px-5 flex items-center justify-between h-18 gap-2">
        {/* Logo and Search */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary shrink-0">
            <Image src="/kas logo2.png" alt="Printing Press Logo" width={32} height={32} className="h-8 w-8 object-contain rounded-full" />
            <span className="hidden sm:inline">PrintingPress</span>
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
              
              {/* Dropdown Menu */}
              {/* {servicesDropdownOpen && categories.length > 0 && (
                <div className={`absolute top-5 left-0 mt-0 w-[90%] bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50`}>
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/category/${category.slug.current}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <Link
                      href="/services"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      All Services
                    </Link>
                  </div>
                </div>
              )} */}
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
            <div className="relative">
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
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
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
        <Link href="/basket" className="px-4 py-2 rounded bg-primary text-white font-medium hover:bg-primary/90 transition flex items-center gap-2 basis-3/5">
          <ShoppingBag className="w-4 h-4" />
          <span>
          My Basket
          </span>
          </Link>
          <Link href="/orders" className="px-4 py-2 rounded bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition flex items-center gap-2 basis-3/5">
          <PackageIcon className="w-4 h-4" />
          <span>
          My Orders
          </span>
          </Link>
          <UserButton />
       </div>: <SignInButton mode="modal">
            <p className="px-4 py-2 rounded bg-primary text-white font-medium hover:bg-primary/90 transition mt-2">Login</p>
            </SignInButton>}
        </div>
      )}


{servicesDropdownOpen && categories.length > 0 && (
                <div onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)} className={`relative grid grid-cols-5 gap-6 mt-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50`}>
                  {categories.map((category) => (
                    <Link href={`/category/${category.slug.current}`} key={category._id} className="flex flex-col gap-2 hover:bg-gray-100 transition-colors items-center">
                    <p
                      className="px-4 py-2 text-sm text-gray-700"
                    >
                      {category.title}
                    </p>
                   {category.image && <Image src={urlFor(category?.image).url() || ''} alt={category.description || ""} width={200} height={150}  />}
                    </Link>
                  ))}
                  <Link href={`/category`} className="flex flex-col gap-2 hover:bg-gray-100 transition-colors items-center">
                    <p
                      className="px-4 py-2 text-sm text-gray-700"
                    >
                      All Services
                    </p>
                    <Image src={'/BRANDING.png'} alt={"All priting services image"} width={200} height={150}  />
                    </Link>
                </div>
              )}
    </header>
  );
}


