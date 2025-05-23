import { Message } from "postcss";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      </div>
    </div>
  );
}
