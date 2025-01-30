import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="py-16 flex-1 mx-auto px-4 h-full w-full max-w-[1308px]">
        {children}
      </div>
      <Footer />
    </div>
  );
}
