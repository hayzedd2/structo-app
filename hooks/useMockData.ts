import { useMutation } from "@tanstack/react-query";
import { structSchema } from "@/schema";
import { z } from "zod";


export const useMockData = () => {
  return useMutation({
    mutationFn: async (values: z.infer<typeof structSchema>) => {
      const response = await fetch("/api/send-mock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      return response.json();
    },
    retry : 3
  });
};
