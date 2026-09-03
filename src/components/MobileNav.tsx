import * as React from 'react';

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export interface MobileNavItem {
  label: string;
  href: string;
}

interface Props {
  items: readonly MobileNavItem[];
  cta: { label: string; href: string };
  /** already-normalised current path, so the island doesn't re-derive it */
  activePath: string;
}

/** Matches SiteHeader's active-link logic: strip the hash, ignore a trailing slash. */
const isActive = (href: string, path: string) => !href.includes('#') && (href.replace(/\/+$/, '') || '/') === path;

export default function MobileNav({ items, cta, activePath }: Props) {
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
                className="border-b-[color:var(--rule)] border-b py-4 font-semibold text-[26px] leading-[1.1] tracking-[-0.03em] text-[color:var(--fg)] aria-[current=page]:text-[color:var(--brand)]"
              >
                {item.label}
              </a>
            </SheetClose>
          ))}

          <a href={cta.href} className="btn btn--brand mt-8 h-12 text-[16px]">
            {cta.label}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
