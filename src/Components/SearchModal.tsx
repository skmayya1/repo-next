import React from 'react';
import Projects from './Search/Projects';
import QuerySection from './Search/QurerySection';

const SearchModal = () => {
  return (
    <div className="h-full w-full flex flex-col md:flex-row items-center justify-center fixed bg-[#FEF5EF] dark:bg-zinc-900 z-100 p-4 md:py-0 py-40">
      <QuerySection />
      <Projects />
    </div>
  );
};

export default SearchModal;