import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function Auth({ children }: { children: ReactNode }) {
  const router = useRouter();
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      return router.push("/");
    },
  });

  if (status === "loading") {
    return (
      <div className="animate-pulse flex justify-center items-center w-full h-full text-xl">
        Authenticating...
      </div>
    );
  }

  return <>{children}</>;
}
