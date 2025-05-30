export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full text-center py-4 bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 font-serif">© {currentYear} Xuan2.org. All rights reserved.</p>
          </div>
          <div>
            <p className="text-gray-600 font-serif">
              Contact:{" "}
              <a href="mailto:baizecreation@outlook.com" className="hover:text-gray-900 transition-colors">
                baizecreation@outlook.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

