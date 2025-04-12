import { z } from 'zod'

export const schema = z
    .object({
        email: z.string().email('Invalid email'),
        name: z.string().min(3, 'Name must be at least 3 characters'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z
            .string()
            .min(8, 'Confirm Password must be at least 8 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

export type FormFields = z.infer<typeof schema>
