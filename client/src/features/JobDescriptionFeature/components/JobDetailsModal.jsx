import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import JobEditForm from "./JobEditForm"; 
import EditButton from "./Buttons/EditButton";

const JobDetailsModal = ({ job, closeModal, isOpen, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleFormClose = () => setIsEditing(false);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClose={closeModal}
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
            {isEditing ? (
              <JobEditForm
                initialData={job}
                onSubmit={() => {
                  setIsEditing(false); 
                }}
                closeModal={handleFormClose}
              />
            ) : (
              <>
                <Dialog.Title className="text-lg font-medium text-white">
                  {job.title}
                </Dialog.Title>
                <p className="text-gray-400">
                  {job.companyName} - {job.companyIndustry}
                </p>
                <div className="mt-4 text-sm text-gray-300 space-y-2">
                  <p><strong>Description:</strong> {job.description}</p>
                  <p><strong>Company Info:</strong> {job.companyInfo || "N/A"}</p>
                  <p><strong>Experience Level:</strong> {job.experience_level}</p>
                  <p><strong>Skills:</strong> {job.skills?.filter(skill => skill.trim()).join(", ") || "None"}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Created:</strong> {new Date(job.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Updated:</strong> {new Date(job.updated_at).toLocaleDateString()}
                  </p>
                </div>
                  <EditButton onClick={() => {onEdit(job); closeModal();}} />
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-900 rounded"
                  >
                    Close
                  </button>
                  
              </>
            )}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default JobDetailsModal;