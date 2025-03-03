import Button from '@/components/Button';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordUserAsync } from '@/redux/actions';
import images from '@/assets/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const FormSchema = z
    .object({
        password_old: z.string().min(6, { message: 'Mật khẩu phải ít nhất 6 kí tự.' }),
        password: z.string().min(6, { message: 'Mật khẩu phải ít nhất 6 kí tự.' }),
        confirmPassword: z.string().min(6, { message: 'Mật khẩu không đồng nhất với mật khẩu đã nhập.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu không đồng nhất với mật khẩu đã nhập.',
        path: ['confirmPassword'],
    });
function ChangePassword({ title, classTitle }) {
    const notify = (message) => toast(message);
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password_old: '',
            password: '',
            confirmPassword: '',
        },
    });
    const dataUserLogin = useSelector((state) => state.auth);

    const onSubmit = async (data) => {
        // dispatch(userLoginAsync(data));
        const dataUserNew = {
            id: dataUserLogin?.user?._id,
            password: data.password_old,
            newPassword: data.password,
        };
        const res = await changePasswordUserAsync(dataUserNew);
        console.log('onSubmit change password', data);
        console.log('onSubmit dataUserNew', dataUserNew);
        console.log('onSubmit change password res', res);

        if (res.success === true && res?.message) {
            notify(res?.message);

            setOpen(false);
        }
        if (res?.success === false) {
            alert(res?.message);
        }
        form.reset();
    };
    const [open, setOpen] = useState(false);
    var classMessage = 'text-[0.9vw] ';
    useEffect(() => {
        form.reset();
    }, []);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className={classTitle}>
                    {title}
                </Button>
            </DialogTrigger>
            <DialogContent className="w-auto min-w-[35vw] bg-black overflow-hidden border-none outline-none !rounded-[20px]">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{
                        backgroundImage: `url(${images.bgAuth})`,
                    }}
                ></div>
                <div className=" z-10 flex flex-col items-center justify-center h-full gap-6 ">
                    <DialogHeader className="w-full">
                        <DialogTitle className="text-[2.4vw] text-white mx-auto p-4">{title}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-[1.2vw]"></DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                            <FormField
                                control={form.control}
                                name="password_old"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-400 text-[1.4vw] mb-2">
                                            Mật khẩu cũ
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full mt-2 bg-transparent !p-8 !text-[1vw] text-white rounded-lg border-[2px] !border-gray-500  focus:!border-gray-100 focus:!outline"
                                                type="password"
                                                placeholder="• • • • • •"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className={classMessage} />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-400 text-[1.4vw] mb-2">
                                            Mật khẩu mới
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full mt-2 bg-transparent !p-8 !text-[1vw] text-white rounded-lg border-[2px] !border-gray-500  focus:!border-gray-100 focus:!outline"
                                                type="password"
                                                placeholder="• • • • • •"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className={classMessage} />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-400 text-[1.4vw] mb-2">
                                            Nhập lại mật khẩu mới
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full mt-2 bg-transparent !p-8 !text-[1vw] text-white rounded-lg border-[2px] !border-gray-500  focus:!border-gray-100 focus:!outline"
                                                type="password"
                                                placeholder="• • • • • •"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className={classMessage} />
                                    </FormItem>
                                )}
                            />

                            <Button
                                className="w-full !mt-12 !p-4 hover:cursor-pointer flex items-center justify-center py-2 text-[1.4vw] hover:opacity-90 !rounded-[999px] font-medium text-black bg-slate-800"
                                type="submit"
                            >
                                {title}
                            </Button>
                        </form>
                    </Form>
                    <DialogFooter className="text-[0.9vw] text-white flex items-center justify-end gap-2 w-full"></DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default ChangePassword;
