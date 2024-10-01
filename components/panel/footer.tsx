import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center w-full">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Copyright © 2024
          <br />
          <span className="font-bold">CX23-1 RJ23-2 DT23-2</span>
        </p>
      </div>
    </div>
  );
}
