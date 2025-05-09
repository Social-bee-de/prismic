'use server';

import { type z } from 'zod';

import { response } from '@/lib/utils';
import { type appointmentSchema } from '@/schemas';

export const saveAppointment = async (payload: z.infer<typeof appointmentSchema>) => {
	void fetch('https://api.socialbee.org/logging', {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			location: 'appointment',
			data: payload,
		}),
	}).then(() => {
		console.log('Log appointment');
	});
	return response({
		success: true,
		code: 200,
		data: {
			TODO: true,
		},
	});
};
