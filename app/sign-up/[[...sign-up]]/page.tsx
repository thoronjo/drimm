import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Join DRIMM</h1>
          <p className="mt-2 text-gray-400">Create an account to start sharing your stories</p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-gray-900 shadow-xl",
            }
          }}
        />
      </div>
    </div>
  );
}
