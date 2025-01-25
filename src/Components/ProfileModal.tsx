import { useModal } from '@/Contexts/ModalContext';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { KindeUserBase } from '@kinde-oss/kinde-auth-nextjs/types';
import Image from 'next/image';
import React from 'react';

interface ProfileModalProps {
  user: KindeUserBase;
}

const ProfileModal = ({ user }: ProfileModalProps) => {
  const { setAuthModalOpenHandler } = useModal();

  // Close the modal when clicking outside of it
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setAuthModalOpenHandler(false);
    }
  };

  return (
    // Backdrop that covers the entire screen
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Modal content */}
      <div className="w-[60vw]  md:w-[30vw]  h-auto p-6 border border-zinc-600 rounded-xl dark:bg-zinc-800 flex flex-col items-center gap-4">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={user.picture as string}
              alt="user"
              width={50}
              height={50}
              className="rounded-full"
            />
            <h1 className="text-xl font-medium">{user.given_name}</h1>
          </div>
          <LogoutLink className="bg-white text-black px-4 py-1.5 rounded-lg border border-black hover:bg-gray-100 transition-colors duration-150">
            Logout
          </LogoutLink>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;