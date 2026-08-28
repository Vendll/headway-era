import * as React from 'react';

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export interface MobileNavItem {
  label: string;
  href: string;
}

interface Props {
  items: readonly MobileNavItem[];
  resumeHref: string;
  /** already-normalised current path, so the island doesn't re-derive it */
  activePath: string;
}

/** Matches SiteHeader's active-link logic: strip the hash, ignore a trailing slash. */
const isActive = (href: string, path: string) => (href.split('#')[0].replace(/\/+$/, '') || '/') === path;

export default function MobileNav({ items, resumeHref, activePath }: Props) {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Menü megnyitása"
        className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--r-sm)] text-[color:var(--fg)]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M4 8h16M4 16h16" />
        </svg>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="border-l-[color:var(--rule)] px-6 pt-[max(28px,env(safe-area-inset-top))] pb-[max(24px,env(safe-area-inset-bottom))]"
      >
        <SheetTitle className="sr-only">Menü</SheetTitle>

        <nav className="mt-10 flex flex-col" aria-label="Primary">
          {items.map((item) => (
            <SheetClose asChild key={item.href}>
              <a
                href={item.href}
                aria-current={isActive(item.href, activePath) ? 'page' : undefined}
                className="border-b-[color:var(--rule)] border-b py-4 font-[family-name:var(--font-mono)] text-[19px] tracking-[-0.03em] text-[color:var(--fg-muted)] aria-[current=page]:text-[color:var(--fg)]"
              >
                {item.label}
              </a>
            </SheetClose>
          ))}

          <a
            href={resumeHref}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-[var(--r-sm)] bg-[color:var(--brand)] font-[family-name:var(--font-mono)] text-[15px] tracking-[-0.02em] text-[color:var(--ink)]"
          >
            Resume
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
