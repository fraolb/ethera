"use client";

import { CirclesSDK } from "@/app/contexts/CirclesSDK";

type Props = {
  children: React.ReactNode;
  cookie?: string | null;
};

export default function Providers({ children, cookie }: Props) {
  return (
    <div>
      <CirclesSDK>{children}</CirclesSDK>
    </div>
  );
}
