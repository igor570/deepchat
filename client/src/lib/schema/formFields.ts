import { z } from 'zod'

export const schema = z
    .object({
        username: z.string().min(2, 'Minimum 2 characters'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z
            .string()
            .min(8, 'Confirm Password must be at least 8 characters')
            .optional(),
    })
    .refine(
        (data) => {
            // Only validate confirmPassword if it exists
            if (data.confirmPassword) {
                return data.password === data.confirmPassword
            }
            return true
        },
        {
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        }
    )

export type FormFields = z.infer<typeof schema>
