import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z
    .object({
        username: z.string().min(2, { message: 'Username must be at least 2 characters.' }),
        email: z.string().email({ message: 'Invalid email address.' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
        confirmPassword: z.string().min(6, { message: 'Confirm Password must be at least 6 characters.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    });

export default function RegistrationForm() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (data) => {
        console.log('Form Submitted:', data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Register</Button>
            </form>
        </Form>
    );
}
