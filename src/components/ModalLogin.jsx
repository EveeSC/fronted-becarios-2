'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function ModalLogin() {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            {/* aqui */}
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div
  className="w-80 rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden"
>
  <div className="flex flex-col justify-center items-center space-y-2">
    <h2 className="text-2xl font-medium text-slate-700">Login</h2>
    <p className="text-slate-500">Enter details below.</p>
  </div>
  <form className="w-full mt-4 space-y-3">
    <div>
      <input
        className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
        placeholder="Username"
        id="username"
        name="username"
        type="text"
      />
    </div>
    <div>
      <input
        className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
        placeholder="Password"
        id="password"
        name="password"
        type="password"
      />
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          className="mr-2 w-4 h-4"
          id="remember"
          name="remember"
          type="checkbox"
        />
        <span className="text-slate-500">Remember me </span>
      </div>
      <a className="text-blue-500 font-medium hover:underline" href="#"
        >Forgot Password</a
      >
    </div>
    <button
      className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2"
      id="login"
      name="login"
      type="submit"
    >
      login
    </button>
    <p className="flex justify-center space-x-1">
      <span className="text-slate-700"> Have an account? </span>
      <a className="text-blue-500 hover:underline" href="#">Sign Up</a>
    </p>
  </form>
</div>
              {/* <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Deactivate account
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to deactivate your account? All of your data will be permanently removed.
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div> */}
            </div>

            {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Deactivate
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
