import { Message } from "postcss";

export default function Signup({ searchParams }: { searchParams: Message }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create an account to get started
        </p>
      </div>
    </div>
  );
}
