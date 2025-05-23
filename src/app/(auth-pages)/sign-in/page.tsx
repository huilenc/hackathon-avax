import { Input } from "@/components/input";
import { Label } from "@/components/label";
import Link from "next/link";
import { Message } from "postcss";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Don't have an account?{" "}
          <Link
            className="text-blue-600 hover:text-blue-500 transition-colors font-medium"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
      </div>
      <div className="w-full max-w-md">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
