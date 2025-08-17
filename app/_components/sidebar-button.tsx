"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import React from "react";

interface SidebarButtonProps {
  href: string;
  children: React.ReactNode;
}

const SidebarButton = ({ href, children }: SidebarButtonProps) => {
  const pathName = usePathname();

  return (
    <Button
      variant={pathName === `${href}` ? "secondary" : "ghost"}
      className="cursor-pointer justify-start gap-2"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SidebarButton;
