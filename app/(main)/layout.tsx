import { Navbar } from '@/components/navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 flex-1 mx-auto px-4 w-full max-w-[1308px]">
        {children}
      </div>
      <footer className="py-4 text-center">
        <p>&copy; 2025 CodeIq. All rights reserved.</p>
        <div className="social-links mt-2"></div>
      </footer>
    </div>
  );
}
