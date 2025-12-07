import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} ChatApp. All rights reserved.
        </p>
        <p className='text-gray-600 text-sm mt-2'>Made with ❤️ by <Link className='text-blue-500 font-bold hover:text-blue-600 hover:underline transition-all duration-300' href={"https://github.com/SHIVAM-KUMAR-59"}>Shivam Kumar</Link></p>
      </div>
    </footer>
  )
}

export default Footer
