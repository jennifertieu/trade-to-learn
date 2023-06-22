type SignInErrorProps = {
  error: string | string[] | undefined;
};

export const SignInError = ({ error }: SignInErrorProps) => {
  const errors: { [key: string]: string } = {
    Signin: "Try signing with a different account.",
    OAuthSignin: "Try signing with a different account.",
    OAuthCallback: "Try signing with a different account.",
    OAuthCreateAccount: "Try signing with a different account.",
    EmailCreateAccount: "Try signing with a different account.",
    Callback: "Try signing with a different account.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account method you used originally.",
    EmailSignin: "Check your email address.",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in.",
  };
  const errorMessage =
    error && (Array.isArray(error) ? errors.default : errors[error]);
  return (
    <div className="bg-red-600 dark:bg-red-400 rounded-lg p-4">
      {errorMessage}
    </div>
  );
};
