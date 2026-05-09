import { Head, useForm, Link } from '@inertiajs/react';
import { LoaderCircle, Mail, ArrowLeft, ShoppingCart } from 'lucide-react';
import { FormEventHandler } from 'react';
import CustomerLayout from '@/layouts/CustomerLayout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <CustomerLayout>
            <Head title="Forgot Password - FreshKart BD" />

            <div className="min-h-[70vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center">
                        <div className="bg-green-600 text-white p-2 rounded-md shadow-lg shadow-green-600/30">
                            <ShoppingCart className="h-8 w-8" strokeWidth={2.5} />
                        </div>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Forgot password?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        No worries, we'll send you reset instructions.
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-lg sm:px-10 border border-gray-100">
                        {status && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg text-center text-sm font-medium text-green-700">
                                {status}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={submit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`block w-full pl-10 pr-3 py-2.5 border ${errors.email ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 placeholder-gray-400 text-gray-900 focus:ring-green-500 focus:border-green-500'} rounded-md sm:text-sm transition-colors outline-none`}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all active:scale-[0.98]"
                                >
                                    {processing ? <LoaderCircle className="h-5 w-5 animate-spin" /> : 'Send Reset Link'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <Link 
                                href={route('login')} 
                                className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-green-600 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to log in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
