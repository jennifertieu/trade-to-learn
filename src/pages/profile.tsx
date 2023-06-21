import Head from "next/head";
import { MutableRefObject, useRef } from "react";

export default function Profile() {
  const dialogRef: MutableRefObject<HTMLDialogElement | null> = useRef(null);

  function openModal() {
    if (!dialogRef.current) return;
    return dialogRef.current.show();
  }

  function closeModal() {
    if (!dialogRef.current) return;
    return dialogRef.current.close();
  }

  return (
    <>
      <Head>
        <title>Trade To Learn | Profile</title>
      </Head>
      <section className="flex justify-center items-center h-full">
        <article className="text-center p-6 rounded-lg border border-neutral-400 dark:bg-neutral-800 dark:border-0">
          <h1 className="text-3xl">Profile</h1>
          <button
            className="mt-4 py-2 px-4 rounded-lg bg-red-600 dark:bg-red-400"
            type="button"
            onClick={openModal}
          >
            Delete Account
          </button>
        </article>
        <dialog
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg border border-neutral-300 dark:bg-neutral-700 dark:border-0"
          ref={dialogRef}
          role="dialog"
          data-testid="confirmation-dialog"
        >
          <p className="font-bold">
            Are you sure you want to delete account? All holdings, transactions,
            etc will be deleted.
          </p>
          <button
            className="mt-2 py-2 px-4 rounded-lg bg-red-600 dark:bg-red-400"
            onClick={closeModal}
          >
            Confirm
          </button>
          <button
            className="mt-2 mx-1 py-2 px-4 rounded-lg bg-neutral-600 dark:bg-neutral-400"
            onClick={closeModal}
          >
            Cancel
          </button>
        </dialog>
      </section>
    </>
  );
}
