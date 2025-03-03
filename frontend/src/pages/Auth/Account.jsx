import images from '@/assets/image';
import config from '@/components/config';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
    checkAuth,
    checkAuthAsync,
    deleteUserAsync,
    delSearchHisAsync,
    getAllUserAsync,
    getSearchHisAsync,
    updateUserAsync,
    userLogin,
    userLoginAsync,
    userRegisterAsync,
} from '@/redux/actions';
import { apiDeleteService, apiPostService, apiPutService } from '@/services/service';
import Tippy from '@tippyjs/react';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Image from '@/components/Image';
import useFormattedTime from '@/hooks/useFormattedTime';
import ChangePassword from './changePassword';

const FormatTime = ({ time }) => {
    const formattedTime = useFormattedTime(time);
    return <div>{formattedTime}</div>;
};

const Account = () => {
    document.title = 'Tài khoản';
    const FormSchema = z.object({
        username: z.string().min(2, { message: 'Trường bắt buộc nhập.' }),
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notify = (message) => toast(message);
    const link_avatar = '/src/assets/avatars';
    const auth_store = useSelector((state) => state.auth);
    const cmt_history_store = useSelector((state) => state.search);
    var classMessage = 'text-[0.9vw] ';
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
        },
        mode: 'onChange',
    });
    if (auth_store.isLogin === false) {
        navigate(config.routes.Home);
    }
    const [user_store, setUser_store] = useState({});
    const [hisSearch, setHisSearch] = useState([]);

    useEffect(() => {
        setUser_store(auth_store?.user);
        dispatch(getSearchHisAsync(auth_store?.user?.email));
    }, [auth_store]);

    useEffect(() => {
        setHisSearch(cmt_history_store?.data || []);
    }, [cmt_history_store]);

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
    });

    const handleUserAsync = async (data, type) => {
        try {
            if (type === 'update') {
                const link_put_user = '/api/v1/auth/update';
                const update = await apiPutService(link_put_user, {}, data);
                return update;
            }
        } catch (error) {
            console.error('handleUserAsync failed:', error);
        }
    };

    const onSubmit = async (data) => {
        if (formData._id) {
            const dataSubmit = { ...data, id: formData._id };

            const update_res = await handleUserAsync(dataSubmit, 'update');
            console.log('formData._id: ', formData._id, dataSubmit);
            if (update_res.success === true) {
                notify(update_res.message);
                dispatch(checkAuthAsync());
            } else if (update_res.success === false) {
                notify(update_res.message);
            } else {
                notify('Có lỗi xảy ra, xin vui lòng thử lại');
            }
            if (!update_res) {
                notify('Có lỗi xảy ra, xin vui lòng thử lại');
                return;
            }
        }
        setIsOpen(false);
    };

    const handleEdit = (user) => {
        setFormData(user);
        form.reset({
            ...user,
            username: user.username || '',
        });
        setIsOpen(true);
    };
    const handleRemoveHisSearch = (title, email) => {
        if (confirm('Bạn có chắc chắn muốn xóa lịch sử tìm kiếm này không?')) {
            dispatch(delSearchHisAsync({ title: title, email: email }));
        }
    };

    return (
        <div className="min-h-screen relative bg-gray-100 p-6 mt-[-72px]">
            <div className="max-w-[70vw] mx-auto mt-[72px]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${images.bgAuth})`,
                    }}
                ></div>
                <div className="bg-transparent relative rounded-lg shadow-md p-6">
                    {/* Header */}

                    <div className="flex gap-10 items-center w-full justify-center">
                        <Image
                            className="current-user w-fit h-fit rounded-full object-cover"
                            fallBack={link_avatar + user_store.image}
                            src={link_avatar + user_store.image}
                            alt="Account"
                        ></Image>
                        <div className="flex gap-2 items-start flex-col !pr-4 w-full">
                            <div className="flex gap-2 items-center">
                                <h1 className="text-[1.9vw] font-[600] text-white">{user_store.username}</h1>
                                <p className="text-[1.1vw] text-white">{user_store.email}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Button
                                    onClick={() => handleEdit(user_store)}
                                    className="!text-[1.1vw] bg-slate-700 hover:bg-slate-800 p-4 h-[36px] rounded-[6px]"
                                >
                                    Chỉnh sửa
                                </Button>

                                <ChangePassword
                                    title="Đổi mật khẩu"
                                    classTitle="!text-[1.1vw] bg-slate-700  hover:bg-slate-800 p-4 h-[36px] rounded-[6px] !font-[400]"
                                />
                            </div>
                            <p className="text-[1.1vw] text-white">{user_store.role}</p>
                        </div>
                    </div>
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <h1 className="px-6 py-6 text-[1.9vw] font-[600] text-white">Lịch sử tìm kiếm</h1>
                        <table className="w-full table-fixed">
                            <thead className="bg-transparent">
                                <tr>
                                    <th className="px-6 py-3 text-left text-[1.1vw] font-medium text-white w-[40vw] uppercase">
                                        Nội dung
                                    </th>
                                    <th className="px-6 py-3 text-left text-[1.1vw] font-medium text-white uppercase w-[15vw]  ">
                                        Thời gian
                                    </th>
                                    <th className="px-6 py-3 text-left text-[1.1vw] font-medium text-white uppercase w-[10vw] "></th>
                                </tr>
                            </thead>
                            <tbody className="bg-transparent divide-y divide-gray-200 text-white">
                                {Array.isArray(hisSearch) &&
                                    hisSearch.map((user_store) => {
                                        return (
                                            <tr
                                                key={user_store._id}
                                                className="bg-transparent hover:rounded-xl hover:bg-slate-900"
                                            >
                                                <Tippy content={user_store.title}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-[0.9vw] overflow-hidden text-ellipsis ">
                                                        {user_store.title}
                                                    </td>
                                                </Tippy>

                                                <td className="px-6 py-4 whitespace-nowrap text-[0.9vw] overflow-hidden">
                                                    <FormatTime time={user_store.createdAt} />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap flex justify-end">
                                                    <div className="flex gap-2 text-[0.9vw]">
                                                        <button
                                                            onClick={() =>
                                                                handleRemoveHisSearch(
                                                                    user_store.title,
                                                                    user_store.email,
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-700 px-6 py-2 rounded-lg flex items-center bg-gray-900"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="animate-scaleIn fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-[40%]">
                        <h2 className="text-[1.6vw] font-semibold mb-4">
                            {formData._id ? 'Cập nhật tài khoản' : 'Thêm tài khoản'}
                        </h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className=" space-y-6">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className=" text-slate-950 block text-[1.1vw]">
                                                Tên đăng nhập
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-full mt-2 bg-transparent !p-8 !text-[1vw] text-black rounded-lg border-[2px] !border-gray-500  focus:!border-gray-100 focus:!outline"
                                                    placeholder="Họ tên"
                                                    value={field.value ?? ''}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage className={classMessage} />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end items-center gap-4">
                                    <button
                                        type="button"
                                        className="!p-4 !px-10 h-fit rounded-[10px] text-[1.1vw] font-medium text-white bg-red-800 hover:bg-red-700"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Hủy
                                    </button>
                                    <Button
                                        className="!p-4 !px-10 h-fit hover:bg-blue-700 text-[1.1vw] rounded-[10px] font-medium text-white bg-blue-800"
                                        type="submit"
                                    >
                                        Cập nhật
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;
