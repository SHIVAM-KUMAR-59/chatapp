'use client'
import { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import Button from './ui/Button'
import Link from 'next/link'
import Logo from './ui/Logo'


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navLinks = ['Home', 'Features']

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='bg-white shadow-md sticky top-0 z-50'>
      <nav className='flex justify-center items-center px-4 lg:px-6 py-4'>
        <div className='flex items-center justify-between w-full max-w-7xl'>
          {/* Logo */}
          <Logo/>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex items-center space-x-8'>  
            {
              navLinks.map((link) => (
                <li key={link} className='relative group'>
                  <Link href={`#${link.toLowerCase()}`} className='text-gray-900 font-medium hover:text-blue-500 transition-colors duration-200'>
                    {link}
                  </Link>
                  <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200'></span>
                </li>
              ))
            }
          </ul>

          {/* Desktop Login Button */}
          <Link href={'/auth/login'} className='hidden md:block'>
            <Button text='Get Started' icon={<ArrowRight className='w-4 h-4'/>} classname='rounded-lg shadow-sm hover:shadow-lg cursor-pointer transform hover:scale-105 font-semibold'/>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'
            aria-label='Toggle menu'
          >
            {isMenuOpen ? (
              <X className='w-6 h-6 text-gray-700' />
            ) : (
              <Menu className='w-6 h-6 text-gray-700' />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='px-4 py-4 bg-gray-50 border-t border-gray-200'>
          <ul className='space-y-4'>
            
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className='block py-2 text-gray-900 font-medium hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors duration-200'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <Link href={'/auth/login'}>
            <Button text='Get Started' icon={<ArrowRight className='w-4 h-4'/>} classname='w-full mt-4 rounded-lg shadow-sm hover:shadow-lg cursor-pointer transform hover:scale-105 font-semibold'/>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar