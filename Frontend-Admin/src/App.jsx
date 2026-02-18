import { useState } from 'react'

function App() {

  return (
    <nav className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold tracking-wide">
        Apni<span className="text-yellow-400">Dukan</span>
      </div>

      {/* Search */}
      <div className="flex-1 mx-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 text-sm">
        <button className="hover:text-yellow-400">Login</button>
        <button className="hover:text-yellow-400">Orders</button>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold">
          Cart
        </button>
      </div>
    </nav>
  )
}

export default App
