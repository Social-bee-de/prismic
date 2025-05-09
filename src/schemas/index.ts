import { z } from 'zod';

export const languageSchema = z.object({
	language: z.string().min(1, 'Language is required.'),
});

export const messageSchema = z.object({
	email: z.string().min(1, 'Email is required.'),
	firstName: z.string(),
	lastName: z.string().min(1, 'Last Name is required.'),
	phone: z.number().optional(),
	message: z.string().min(1, 'Message is required.'),
});

export const appointmentSchema = z.object({
	email: z.string().min(1, 'Email is required.'),
	firstName: z.string().min(1, 'First Name is required.'),
	lastName: z.string().min(1, 'Last Name is required.'),
	area: z.string().optional(),
	topic: z.string().min(1, 'Topic is required.'),
	location: z.string().optional(),
	peopleAmount: z.number().optional(),
	message: z.string().optional(),
});
