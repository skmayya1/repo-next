import React from 'react'
import QurerySection from './Search/QurerySection'
import Projects from './Search/Projects'

const SearchModal = () => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <QurerySection />
      <Projects />

    </div>
  )
}

export default SearchModal