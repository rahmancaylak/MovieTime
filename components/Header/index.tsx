'use client';
import { useState, Fragment } from 'react';

import Link from 'next/link';
import { FaPlayCircle, FaBars, FaStream } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import { Popover, Transition } from '@headlessui/react';

//Components
import {Logo} from '@/components'

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { data:session } = useSession();
  console.log(session);
  return (
    <header className='relative'>
      <div className='z-20 flex md:grid md:grid-cols-4 justify-between h-20 items-center px-4 md:px-8 bg-gradient-to-r from-gray-700 to-gray-800 border-b-2 border-gray-400'>
        <Link href='/' className='flex items-center md:col-span-3'>
          <Logo icon={<FaPlayCircle size={32} />}>Movie Time</Logo>
        </Link>
        <nav className='hidden  md:flex md:justify-end items-center gap-7 text-white'>
          {session?.user ? (
            <Link href='/user/profile' className='hover:text-gray-300'>
              {session.user.email}
            </Link>
          ) : (
            <>
              <Link href='/auth/login' className='hover:text-gray-300'>
                Login
              </Link>
              <Link
                href='/auth/sign-up'
                className='bg-gray-700 rounded px-4 md:px-6 py-2 hover:bg-gray-700/80 font-semibold'
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
        <div className='flex justify-end md:hidden text-white cursor-pointer'>
          {!isMobile ? (
            <>
              <FaBars size={24} onClick={() => setIsMobile(true)} />
            </>
          ) : (
            <FaStream size={24} onClick={() => setIsMobile(false)} />
          )}
        </div>
      </div>
      {/* <Transition
        className='block bg-gray-600 absolute top-full w-full h-screen z-20 px-2 pt-6'
        show={isMobile}
        as={Fragment}
        enter='transition ease-in-out duration-500'
        enterFrom='opacity-0 translate-x-4'
        enterTo='opacity-100 translate-x-0'
        leave='transition ease-in-out duration-1000'
        leaveFrom='opacity-100 translate-x-0'
        leaveTo='opacity-0 translate-x-4'
      >
        <div>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
        </div>
      </Transition> */}
    </header>
  );
};

export default Header;