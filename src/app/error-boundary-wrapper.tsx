'use client';
import { ReactNode } from 'react';

const ErrorBoundaryWrapper = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default ErrorBoundaryWrapper;
