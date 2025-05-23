import { type NextRequest, type NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function createSupabaseServerClient(component: boolean = false) {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll();
        },
        setAll(cookiesToSet) {
          if (component) return;
          cookiesToSet.forEach(async ({ name, value, options }) => {
            const cookie = await cookieStore;
            cookie.set(name, value, options);
          });
        },
      },
    }
  );
}

export async function createSupabaseServerComponentClient() {
  const cookieStore = await cookies();
  cookieStore.getAll();
  return createSupabaseServerClient(true);
}

export async function createSupabaseReqResClient(
  req: NextRequest,
  res: NextResponse
) {
  const cookieStore = await cookies();
  cookieStore.getAll();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );
}