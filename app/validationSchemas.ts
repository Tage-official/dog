import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Название обязательно.").max(255),
  address: z.string().min(1, "Адрес обязателен.").max(255),
  phoneNumber: z.string().min(1, "Номер телефона обязателен.").max(255),
  description: z
    .string()
    .min(1, "Описание обязательно.")
    .max(65535),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Название обязательно.")
    .max(255)
    .optional(),
  description: z
    .string()
    .min(1, "Описание обязательно.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
  address: z
    .string()
    .min(1, "Адрес обязателен.")
    .max(255)
    .optional(),
  phoneNumber: z
    .string()
    .min(1, "Номер телефона обязателен.")
    .max(255)
    .optional(),
  status: z
    .string()
    .min(1, "Статус обязателен.")
    .max(255)
    .optional(),
});

export const requestSchema = z.object({
  price: z
    .number()
    .min(1, "Цена обязательна.")
    .max(1000000000),
  description: z
    .string()
    .min(1, "Описание обязательно.")
    .max(65535),
});

export const patchRequestSchema = z.object({
  price: z
    .number()
    .min(1, "Цена обязательна.")
    .max(1000000000)
    .optional(),
  description: z
    .string()
    .min(1, "Описание обязательно.")
    .max(65535)
    .optional(),
});
