import { Outlet } from 'react-router-dom';

export const SignageLayout = () => {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden font-display antialiased selection:bg-none cursor-none">
            {/* Main Content Area */}
            <main className="h-screen w-screen relative">
                <Outlet />
            </main>
        </div>
    );
};

export default SignageLayout;
