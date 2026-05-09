import { Head } from '@inertiajs/react';
import CustomerLayout from '../layouts/CustomerLayout';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
    return (
        <CustomerLayout>
            <Head title="Contact Us - FreshKart BD" />
            
            <div className="bg-gray-50 py-16 min-h-[60vh]">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-8 md:p-12">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
                            <p className="text-gray-600 mb-8">
                                Have questions about your order or our services? Our team is ready to help you out. 
                                Fill out the form below or reach us directly.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-1">Name</label>
                                        <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="Your Name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-1">Email</label>
                                        <input type="email" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="your@email.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-1">Message</label>
                                        <textarea rows={4} className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="How can we help?"></textarea>
                                    </div>
                                    <button type="button" className="bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition-colors w-full">
                                        Send Message
                                    </button>
                                </form>
                                
                                <div className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                    <h3 className="font-bold text-lg text-gray-900">Get in Touch</h3>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white p-2 rounded-md shadow-sm border border-gray-200">
                                            <Phone className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Phone</p>
                                            <p className="text-gray-600">+880 1700 000 000</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white p-2 rounded-md shadow-sm border border-gray-200">
                                            <Mail className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Email</p>
                                            <p className="text-gray-600">support@freshkartbd.com</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white p-2 rounded-md shadow-sm border border-gray-200">
                                            <MapPin className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Office</p>
                                            <p className="text-gray-600">Banani, Dhaka, Bangladesh</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
