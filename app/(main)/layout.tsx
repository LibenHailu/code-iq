import { Navbar } from '@/components/navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 flex-1 mx-auto px-4 h-full w-full max-w-[1308px]">
        {children}
      </div>
      <footer className="fixed z-50 bottom-0 px-4 w-full border-t shadow-sm  backdrop-filter backdrop-blur-lg">
        <div className="max-w-[1308px] flex h-14 items-center justify-center mx-auto">
          <p className="font-medium text-sm text-muted-foreground">
            &copy; 2025 CodeIQ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
