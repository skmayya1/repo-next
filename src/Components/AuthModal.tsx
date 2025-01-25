import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const AuthModal = () => {
  return (
    <div className="fixed inset-0 flex justify-center w-full items-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className=" sm:w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] rounded-xl h-auto p-8 border bg-[#FEF5EF] dark:bg-zinc-800 border-zinc-600 shadow-md flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-center">Sign in to RepoGallery</h1>
        <LoginLink
          className="flex items-center justify-center gap-3 border font-mono border-zinc-700 font-medium tracking-normal py-3 px-8 rounded-xl text-lg hover:bg-[#252525] transition-all ease-in-out duration-150 w-full sm:w-auto"
          authUrlParams={{
            connection_id: process.env.GOOGLE_CONNECTION_ID || "conn_01946e53bb9d7e9dec5c889a81f3f982",
          }}
        >
          <FaGithub /> Sign In with GitHub
        </LoginLink>
      </div>
    </div>
  );
};

export default AuthModal;