// BuilderPageServer.tsx
import { GetFormByParams } from "@/actions/Form";

export async function BuilderPageServer({ id }: { id: string }) {
  const form = await GetFormByParams(Number(id));
  if (!form) {
    throw new Error("Form Not Found");
  }
  return { form };
}