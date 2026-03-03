import Image from "next/image"
import Link from "next/link"

export default function NavbarTwo() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">

        {/* Logo */}
        <Link href="/" className="relative h-[50px] w-[190px]">
          <Image
            src="/Images/logo.png"
            alt="Logo"
            fill
            priority
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-[18px] font-medium text-primary">
          <Link href="/#how-it-works" scroll>
            How it works
          </Link>

          <Link href="/#pricing" scroll>
            Pricing
          </Link>

          <Link href="/#why-us" scroll>
            Why us
          </Link>

          <Link href="/blog">
            Blog
          </Link>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="secondary-btn">
            Login
          </Link>

          <Link href="/contact" className="primary-btn">
            Contact Us
          </Link>
        </div>

        {/* Mobile simple version */}
        <div className="md:hidden">
          <Link href="/blog" className="text-primary font-medium">
            Menu
          </Link>
        </div>

      </div>
    </header>
  )
}