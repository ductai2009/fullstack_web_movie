import config from '@/components/config';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import images from '@/assets/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { store } from '@/redux/store';
import { userLoginAsync } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const FormSchema = z.object({
    email: z.string().email({ message: 'Địa chỉ email không hợp lệ.' }),
    password: z.string().min(6, { message: 'Mật khẩu phải ít nhất 6 kí tự.' }),
});

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    document.title = 'Đăng nhập';
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const dataUserLogin = useSelector((state) => state.auth);
    if (dataUserLogin?.success === true && dataUserLogin?.isLogin === true) {
        navigate(config.routes.Home);
    }
    const onSubmit = (data) => {
        dispatch(userLoginAsync(data));
        console.log('onSubmit ', data);

        if (dataUserLogin.success === true && dataUserLogin?.isLogin === true) {
            navigate(config.routes.Home);
        }
        if (dataUserLogin?.success === false && dataUserLogin?.isLogin === false && dataUserLogin.message) {
            alert(dataUserLogin?.message);
        }
    };

    var classMessage = 'text-[0.9vw] ';
    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black">
            <div
                className=" absolute inset-0 bg-cover bg-center opacity-70"
                style={{
                    backgroundImage: `url(${images.bgAuth})`,
                }}
            ></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                {/* Logo */}
                <Link to={config.routes.Home} className="absolute top-20 left-20 w-40 max-md:w-32">
                    <img src={images.logo} alt="Galaxy Play Logo" />
                </Link>
                <div className="flex flex-col gap-6 w-[33%]  bg-opacity-50 rounded-lg shadow-md p-[3%] max-md:w-[80%] max-md:gap-4">
                    <h1 className="text-[2.5vw] font-bold text-center mb-4">Đăng Nhập</h1>
                    {/* Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-400 text-[1.4vw] mb-2">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full mt-2 bg-transparent !p-8 !text-[1vw] text-white rounded-lg border-[2px] !border-gray-500  focus:!border-gray-100 focus:!outline max-md:!p-6 max-md:!text-[1.2vw]"
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
                                                className="w-full mt-2 bg-transparent !p-8 !text-[1vw] text-white rounded-lg border-[2px] !border-gray-500  focus:!border-gray-100 focus:!outline max-md:!p-6 max-md:!text-[1.2vw]"
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
                                className="w-full !mt-12 !p-10 hover:cursor-pointer hover:bg-slate-300 flex items-center justify-center py-2 text-[1.4vw] hover:opacity-90 rounded-[999px] font-medium text-black bg-zinc-100 max-md:!p-6 max-md:!text-[1.6vw]"
                                type="submit"
                            >
                                Đăng nhập
                            </Button>
                        </form>
                    </Form>
                    <div className="flex text-[0.9vw] text-gray-300 gap-2 justify-end max-md:text-[1.2vw]">
                        Nếu bạn chưa có tài khoản, có thể
                        <Link
                            to={config.routes.Register}
                            className="text-[0.9vw] hover:underline  text-blue-500 max-md:text-[1.2vw]"
                        >
                            Đăng ký tại đây.
                        </Link>
                    </div>
                </div>
                {/* Footer */}
                <div className="absolute bottom-4 text-center text-[0.9vw] text-gray-300 ">
                    <a href="#" className="hover:underline">
                        Hỗ trợ
                    </a>{' '}
                    •{' '}
                    <a href="#" className="hover:underline">
                        Chính sách bảo mật
                    </a>
                </div>
            </div>
        </div>
    );
}
