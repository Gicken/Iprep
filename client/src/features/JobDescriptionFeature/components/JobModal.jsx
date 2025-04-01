import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";


const JobModal = ({ isOpen, closeModal, title, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClose={closeModal}>
        <Transition.Child enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
          <div className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-xl">
            <Dialog.Title className="text-lg font-medium text-white">{title}</Dialog.Title>
            <div className="mt-4">{children}</div>
            <button onClick={closeModal} className="mt-4 w-full bg-gray-700  hover:bg-gray-900 cursor-pointer p-2 rounded">Close</button>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default JobModal;
