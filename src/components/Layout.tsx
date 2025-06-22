import { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen max-w-md mx-auto bg-slate-50 text-slate-800 font-sans overflow-hidden relative">
      {children}
    </div>
  );
};
