import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { SecondaryButton } from "./Buttons";

const LogoutWarning = ({ isOpen, onStayLoggedIn, countdown = 60 }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClose={onStayLoggedIn}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-xl">
            <Dialog.Title className="text-lg font-medium text-white">
              You're About to Be Logged Out
            </Dialog.Title>
            <p className="mt-2 text-sm text-gray-300">
              Due to inactivity, you will be logged out in {countdown} seconds.
            </p>
            <div className="mt-4">
              <SecondaryButton onClick={onStayLoggedIn} className="w-full">
                Stay Logged In
              </SecondaryButton>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default LogoutWarning;


// import React from 'react'
// import { SecondaryButton } from './Buttons'

// const LogoutWarning = ({ onStayLoggedIn }) => {
//   return (
//     <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
//       <div className='bg-gray-800 rounded-lg p-6 max-w-md w-full text-center'>
//         <h2 className='text-xl font-semibold mb-4'>
//           You're About to Be Logged Out
//         </h2>
//         <p className='text-gray-300 mb-6'>
//           Due to inactivity, you will be logged out in 1 minute. Click the
//           button below to stay logged in.
//         </p>
//         <SecondaryButton onClick={onStayLoggedIn}>
//           Stay Logged In
//         </SecondaryButton>
//       </div>
//     </div>
//   )
// }

// export default LogoutWarning
