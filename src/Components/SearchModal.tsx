import React from 'react'
import QurerySection from './Search/QurerySection'
import Projects from './Search/Projects'

const SearchModal = () => {
  return (
    <div className='h-full w-full flex items-center justify-center fixed  dark:bg-zinc-900 z-100 p-4'>
      <QurerySection />
      <Projects />
    </div>
  )
}

export default SearchModal