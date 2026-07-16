'use client';

import { AdminProvider } from '@/app/admin-provider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProvider>{children}</AdminProvider>;
}
