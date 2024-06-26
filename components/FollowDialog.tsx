import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";

export default function FollowDialog({ isOpen, setIsOpen }) {
  function close() {
    setIsOpen(false);
  }
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-3xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Hold On!
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                Please login to follow your favorite Streamer!
              </p>
              <div className="mt-4">
                <Link
                  className="inline-flex items-center gap-2 rounded-md bg-orange-500 hover:bg-orange-300 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  href="/"
                >
                  Login
                </Link>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
