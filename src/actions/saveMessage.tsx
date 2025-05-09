"use server";

import { z } from "zod";
import { response } from "@/lib/utils";
import { messageSchema } from "@/schemas";

export const saveMessage = async (payload: z.infer<typeof messageSchema>) => {
  // info@social-bee.de
  fetch('https://api.socialbee.org/message', {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(payload),
  }).then(() => {
    console.log('Log message');
  });
  return response({
    success: true,
    code: 200,
    data: {
      TODO: true
    }
  });
};
