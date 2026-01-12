import { ReactNode } from 'react';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </div>
            </main>
            <Toaster
                position="top-right"
                toastOptions={{
                    className: 'text-sm font-medium',
                    duration: 3000,
                    style: {
                        background: '#1e293b',
                        color: '#f8fafc',
                        borderRadius: '12px',
                        padding: '12px 16px',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#f8fafc',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#f43f5e',
                            secondary: '#f8fafc',
                        },
                    },
                }}
            />
        </div>
    );
};

export default Layout;
