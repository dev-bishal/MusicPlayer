import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'
import BottomPlayer from './BottomPlayer.jsx'
import MobileNav from './MobileNav.jsx'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const onPlayerPage = pathname === '/player'

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Open menu"
      >
        <i className="fas fa-bars text-gray-700 dark:text-gray-300"></i>
      </button>

      <div className="flex h-screen">
        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main id="main-scroll" className="flex-1 overflow-y-auto min-w-0">
          <Header />
          <div className="p-4 md:p-8 pb-40 md:pb-32">{children}</div>
        </main>
      </div>

      <MobileNav />
      {!onPlayerPage && <BottomPlayer />}
    </div>
  )
}
