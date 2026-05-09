import AccountLayout from '@/layouts/AccountLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, ShieldCheck } from 'lucide-react';

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage() .props as any;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <AccountLayout title="Profile Settings" activeTab="profile">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                        <p className="text-sm text-gray-500">Update your account's profile information and email address.</p>
                    </div>
                </div>

                <div className="p-8 max-w-2xl">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700 font-bold">Full Name</Label>
                            <Input
                                id="name"
                                className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 font-bold">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                                <p className="text-sm text-yellow-800">
                                    Your email address is unverified.
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="ml-2 font-bold underline hover:text-yellow-900"
                                    >
                                        Click here to re-send the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-bold text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button 
                                disabled={processing}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm font-bold text-green-600 flex items-center gap-1">
                                    <ShieldCheck className="w-4 h-4" /> Saved Successfully
                                </p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>

            {/* Security Note */}
            <div className="bg-gray-100/50 rounded-2xl p-6 border border-gray-100 flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl text-gray-400 shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-1">Security & Privacy</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        We value your privacy. Your personal information is securely stored and will never be shared with third parties without your consent. To change your password, please visit the security settings.
                    </p>
                </div>
            </div>
        </AccountLayout>
    );
}
