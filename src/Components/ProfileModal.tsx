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
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50"
      onClick={handleBackdropClick}
    >
      {/* Modal content */}
      <div className="h-[10%] border border-zinc-500 rounded-xl w-[20%] dark:bg-zinc-800 items-center flex flex-col px-10 py-5">
        <div className="w-full h-full flex items-center">
          <div className="w-full flex items-center gap-5">
            <Image
              src={user.picture as string}
              alt="user"
              width={50}
              height={50}
              className="rounded-full"
            />
            <h1 className="text-xl">{user.given_name}</h1>
          </div>
          <LogoutLink className="bg-white text-black px-4 py-1.5 rounded-lg border border-black">
            Logout
          </LogoutLink>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;