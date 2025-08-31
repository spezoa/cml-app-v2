'use client';

import * as React from 'react';

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(1200px_600px_at_50%_-200px,rgba(0,0,0,0.08),transparent)] dark:bg-[radial-gradient(1200px_600px_at_50%_-200px,rgba(255,255,255,0.07),transparent)]">
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
