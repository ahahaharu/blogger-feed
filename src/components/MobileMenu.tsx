'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function MobileMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-70 p-6">
        <SheetHeader className="text-left border-b pb-4 mb-4">
          <SheetTitle className="text-xl font-bold">Навигация</SheetTitle>
        </SheetHeader>
        <div onClick={() => setOpen(false)} className="flex flex-col gap-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
