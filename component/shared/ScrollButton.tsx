"use client";

import { useRouter, usePathname } from "next/navigation";

export default function ScrollButton({
  sectionId,
  children,
}: {
  sectionId: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== "/") {
      router.push(`/?scrollTo=${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-left cursor-pointer hover:text-secondary transition"
    >
      {children}
    </button>
  );
}