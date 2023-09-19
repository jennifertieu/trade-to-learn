import Head from "next/head";
import { MutableRefObject, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

export default function Profile() {
  const [isExecuting, setIsExecuting] = useState(false);
  const { data: session } = useSession();
  const dialogRef: MutableRefObject<HTMLDialogElement | null> = useRef(null);

  function openModal() {
    if (!dialogRef.current) return;
    return dialogRef.current.show();
  }

  function closeModal() {
    if (!dialogRef.current) return;
    return dialogRef.current.close();
  }

  async function deleteUserAccount() {
    try {
      //close modal
      dialogRef.current?.close();
      setIsExecuting(true);
      // delete user portfolio
      await fetch(`/api/portfolio/${session?.user.id}`, {
        method: "DELETE",
        headers: {
          "Context-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id,
        }),
      });
      // display success message
      toast.success("Account deleted successfully. Logging out...");
      // sign user out
      signOut();
    } catch (ex) {
      // display error message
      toast.error(
        "Something went wrong. Please contact support if application is not working."
      );

      setIsExecuting(false);
    }
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
            className={`${
              isExecuting ? "opacity-50" : "opacity-100"
            } mt-4 py-2 px-10 rounded-lg bg-red-600 dark:bg-red-400 relative`}
            type="button"
            onClick={openModal}
            disabled={isExecuting ? true : false}
          >
            {isExecuting && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white absolute top-2.5 left-3.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
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
            onClick={deleteUserAccount}
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
