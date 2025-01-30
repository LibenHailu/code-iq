import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
};

export default Loading;
