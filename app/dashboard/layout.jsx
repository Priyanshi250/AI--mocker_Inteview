import React from 'react'
import Header from './_components/Header'

function DashBoardLayout({children}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900">
      <Header />
      {children}
    </div>
  )
}

export default DashBoardLayout