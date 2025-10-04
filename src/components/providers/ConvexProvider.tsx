'use client';

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface ConvexProviderWrapperProps {
  children: ReactNode;
}

export function ConvexProviderWrapper({ children }: ConvexProviderWrapperProps) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
