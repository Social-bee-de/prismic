import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag("prismic");

  revalidatePath(`/home`);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
