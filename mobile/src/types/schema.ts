import { z } from "zod";
import { targetStatusEnum } from "@/schema";

export const targetFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  description: z.string().trim().optional(),
  targetDate: z
    .string()
    .trim()
    .min(1, "Target date is required")
    .refine((value) => !Number.isNaN(new Date(value).getTime()), "Use a valid date"),
  status: z.enum(targetStatusEnum),
});

export type TargetFormValues = z.infer<typeof targetFormSchema>;
