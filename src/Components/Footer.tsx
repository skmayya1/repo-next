import { Heart } from 'lucide-react';
import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-800 py-6 w-full ">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="flex flex-col items-center space-y-2">
                        <p className="text-sm text-zinc-400">
                            © {currentYear} RepoGallery
                        </p>
                        <span className="text-sm text-zinc-400 flex items-center">
                            Made with <Heart size={16} className="mx-1 text-red-500" /> by <a className='ml-1 underline' href="">Skmayya</a>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


//Add Tech Stack in profile section
//lazy and loading and suspense optimizations
//responsive design