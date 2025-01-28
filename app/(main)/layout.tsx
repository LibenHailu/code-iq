import { Navbar } from '@/components/navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className=" pt-16 ">
        <div className="mx-auto flex-1 px-4 flex h-full w-full max-w-[1308px] flex-col ">
          {children}
        </div>
      </main>
    </>
  );
}
