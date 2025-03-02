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
    deleteUserAsync,
    getAllUserAsync,
    updateUserAsync,
    userLogin,
    userLoginAsync,
    userRegisterAsync,
} from '@/redux/actions';
import { apiDeleteService, apiPostService, apiPutService } from '@/services/service';

import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
    document.title = 'Quản lý tài khoản';
    const FormSchema = z.object({
        username: z.string().min(2, { message: 'Trường bắt buộc nhập.' }),
        email: z.string().email({ message: 'Địa chỉ email không hợp lệ.' }),
        password: z.string().min(6, { message: 'Mật khẩu phải ít nhất 6 kí tự.' }),
        role: z.string().min(2, { message: 'Trường bắt buộc chọn.' }),
        status: z.string().min(2, { message: 'Trường bắt buộc chọn.' }),
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notify = (message) => toast(message);
    const allUserStore = useSelector((state) => state.allUser);
    const auth_store = useSelector((state) => state.auth);
    var classMessage = 'text-[0.9vw] ';
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            role: '',
            status: '',
        },
        mode: 'onChange',
    });
    if (auth_store?.user?.role !== 'admin' || auth_store?.user?.isAdmin !== true) {
        navigate(config.routes.Home);
    }
    const [users, setUsers] = useState([]);
    useEffect(() => {
        setUsers(allUserStore?.user);
    }, [allUserStore]);

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user',
        status: 'active',
    });
    const onSubmit_ = (data) => {
        console.log('onSubmit ', data);
    };
    useEffect(() => {
        dispatch(getAllUserAsync());
    }, []);
    const [searchTerm, setSearchTerm] = useState('');
    const handleUserAsync = async (data, type) => {
        try {
            if (type === 'delete') {
                const link_get_user = '/api/v1/auth/delete';
                const deleteUser = await apiDeleteService(link_get_user, {}, data);
                return deleteUser;
            } else if (type === 'update') {
                const link_put_user = '/api/v1/auth/update';
                const update = await apiPutService(link_put_user, {}, data);
                return update;
            } else if (type === 'add') {
                const link_register = '/api/v1/auth/register';
                const dataBody = { ...data, isCookie: !auth_store?.user?.isAdmin };
                const response = await apiPostService(link_register, {}, dataBody);
                return response;
            }
        } catch (error) {
            console.error('handleUserAsync failed:', error);
        }
    };
    const onSubmit = async (data) => {
        // return;
        if (formData._id) {
            const dataSubmit = { ...data, id: formData._id };

            const update_res = await handleUserAsync(dataSubmit, 'update');
            console.log('formData._id: ', formData._id, dataSubmit);
            if (update_res.success === true) {
                notify(update_res.message);
                dispatch(getAllUserAsync());
            } else if (update_res.success === false) {
                notify(update_res.message);
            } else {
                notify('Có lỗi xảy ra, xin vui lòng thử lại');
            }
            if (!update_res) {
                notify('Có lỗi xảy ra, xin vui lòng thử lại');
                return;
            }
        } else {
            const add_res = await handleUserAsync(data, 'add');
            if (add_res.success === true) {
                notify(add_res.message);
                setUsers([...users, { ...data, _id: users.length + 1 }]);
            } else if (add_res.success === false) {
                notify(add_res.message);
            } else {
                notify('Có lỗi xảy ra, xin vui lòng thử lại');
            }
            if (!add_res) {
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
            email: user.email || '',
            password: '',
            role: user.role || '',
            status: user.status || '',
        });
        setIsOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa tài khoản này không?' + id)) {
            const del = await handleUserAsync({ id }, 'delete');
            console.log('handleDelete del: ', del);
            if (del.success === true) {
                setUsers(users.filter((user) => user._id !== id));
                notify(del.message);
            } else if (del.success === false) {
                notify(del.message);
            } else {
                notify('Có lỗi xảy ra, xin vui lòng thử lại');
            }
            if (!del) {
                notify('Có lỗi xảy ra, xin vui lòng thử lại');
                return;
            }
        }
    };
    const handleAddUser = () => {
        setFormData({ username: '', email: '', role: '', status: '' });
        form.reset({ username: '', email: '', role: '', status: '' });
        setIsOpen(true);
    };

    const filteredUsers = (Array.isArray(users) ? users : []).filter(
        (user) =>
            user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="min-h-screen relative bg-gray-100 p-6">
            <div className="max-w-[70vw] mx-auto ">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${images.bgAuth})`,
                    }}
                ></div>
                <div className="bg-transparent relative rounded-lg shadow-md p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-[1.8vw] font-semibold text-white">Quản lý thông tin tài khoản</h1>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                            onClick={() => handleAddUser()}
                        >
                            Add User
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Tìm kiếm Tên ĐN hoặc Email..."
                            className="w-full px-4 py-2 border rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-transparent">
                                <tr>
                                    <th className="px-6 py-3 text-left text-[1.1vw] font-medium text-white uppercase">
                                        Tên ĐN
                                    </th>
                                    <th className="px-6 py-3 text-left text-[1.1vw] font-medium text-white uppercase">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-[1.1vw] font-medium text-white uppercase">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-[1.1vw] font-medium text-white uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-[1.1vw] font-medium text-white uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-transparent divide-y divide-gray-200 text-white">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="bg-transparent hover:rounded-xl hover:bg-slate-900">
                                        <td className="px-6 py-4 whitespace-nowrap text-[0.9vw]">{user.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[0.9vw]">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[0.9vw]">{user.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[0.9vw]">
                                            <span
                                                className={`px-2 py-1 rounded-3xl text-[0.8vw] ${
                                                    user.status === 'active'
                                                        ? 'bg-green-300 text-green-900'
                                                        : 'bg-red-300 text-red-900'
                                                }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-2 text-[0.9vw]">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="text-blue-600 hover:text-blue-800  px-6 py-2 rounded-lg flex items-center bg-gray-900"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="text-red-600 hover:text-red-800 px-6 py-2 rounded-lg flex items-center bg-gray-900"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-slate-950 text-[1.1vw] mb-2">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    readOnly
                                                    onFocus={(e) => e.target.removeAttribute('readonly')}
                                                    className="w-full mt-2 bg-transparent !p-8 !text-[1vw] text-black rounded-lg border-[2px] !border-gray-500  focus:!border-gray-100 focus:!outline"
                                                    type="email"
                                                    placeholder="Galaxy@gmail.com"
                                                    value={field.value ?? ''}
                                                    onChange={field.onChange}
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
                                            <FormLabel className="block text-slate-950 text-[1.1vw] mb-2">
                                                Mật khẩu
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-full mt-2 bg-transparent !p-8 !text-[1vw] text-black rounded-lg border-[2px] !border-gray-500  focus:!border-gray-100 focus:!outline"
                                                    type="password"
                                                    placeholder="• • • • • •"
                                                    value={field.value ?? ''}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage className={classMessage} />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-slate-950 text-[1.1vw] mb-2">
                                                Role
                                            </FormLabel>
                                            <FormControl>
                                                <select
                                                    className="w-full mt-2 bg-transparent !p-4 !text-[1vw] text-black rounded-lg border-[2px] !border-gray-500  focus:!border-gray-100 focus:!outline"
                                                    value={field.value ?? ''}
                                                    onChange={field.onChange}
                                                >
                                                    <option value="">Chọn role</option>
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </FormControl>
                                            <FormMessage className={classMessage} />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-slate-950 text-[1.1vw] mb-2">
                                                Status
                                            </FormLabel>
                                            <FormControl>
                                                <select
                                                    className="w-full mt-2 bg-transparent !p-4 !text-[1vw] text-black rounded-lg border-[2px] !border-gray-500  focus:!border-gray-100 focus:!outline"
                                                    value={field.value ?? ''}
                                                    onChange={field.onChange}
                                                >
                                                    <option value="">Chọn status</option>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
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
                                        Đăng ký
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

export default UserManagement;
