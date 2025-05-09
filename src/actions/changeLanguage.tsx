"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { response } from "@/lib/utils";
import { languageSchema } from "@/schemas";

export const changeLanguage = async (payload: z.infer<typeof languageSchema>) => {
  fetch('https://api.socialbee.org/logging', {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify({
      location: 'language-business',
      data: {
        language: payload.language,
      },
    }),
  }).then((e) => {
    console.log('Log language: ', payload.language);
  });

  cookies().set('i18next', payload.language);
  return response({
    success: true,
    code: 200,
    data: {
      cookie: true
    }
  });
};
