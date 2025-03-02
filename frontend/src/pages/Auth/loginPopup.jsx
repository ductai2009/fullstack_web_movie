// import { Button } from '@/components/ui/button';
import Button from '@/components/Button';
import config from '@/components/config';
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
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAsync } from '@/redux/actions';
import images from '@/assets/image';
import { useState } from 'react';
const FormSchema = z.object({
    email: z.string().email({ message: 'Địa chỉ email không hợp lệ.' }),
    password: z.string().min(6, { message: 'Mật khẩu phải ít nhất 6 kí tự.' }),
});
function LoginPopup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const dataUserLogin = useSelector((state) => state.auth);
    if (dataUserLogin?.success === true && dataUserLogin?.isLogin === true) {
        // navigate(config.routes.Home);
    }
    const onSubmit = (data) => {
        dispatch(userLoginAsync(data));
        console.log('onSubmit ', data);

        if (dataUserLogin.success === true && dataUserLogin?.isLogin === true) {
            // navigate(config.routes.Home);
            setOpen(false);
        }
        if (dataUserLogin?.success === false && dataUserLogin?.isLogin === false && dataUserLogin.message) {
            alert(dataUserLogin?.message);
        }
    };
    const [open, setOpen] = useState(false);
    var classMessage = 'text-[0.9vw] ';
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-[1vw] ">
                    Đăng nhập để xem phim
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
                        <DialogTitle className="text-[2.4vw] text-white mx-auto p-4">Đăng nhập</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-[1.2vw]"></DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-400 text-[1.4vw] mb-2">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full mt-2 bg-transparent !p-8 !text-[1vw] text-white rounded-lg border-[2px] !border-gray-500  focus:!border-gray-100 focus:!outline"
                                                type="email"
                                                placeholder="Galaxy@gmail.com"
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
                                            Mật khẩu
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
                                Đăng nhập
                            </Button>
                        </form>
                    </Form>
                    <DialogFooter className="text-[0.9vw] text-white flex items-center justify-end gap-2 w-full">
                        Nếu bạn chưa có tài khoản, đến phần{' '}
                        <Link to={config.routes.Register} className="text-[0.9vw] !text-blue-600 hover:underline">
                            Đăng ký
                        </Link>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default LoginPopup;
