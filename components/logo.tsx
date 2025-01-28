import Image from 'next/image';
export const Logo = () => {
  return (
    <div className="flex gap-2 items-center">
      <Image
        alt="CodeIQ logo"
        src="/logo/logo.svg"
        width="24"
        height="24"
      />
    </div>
  );
};
