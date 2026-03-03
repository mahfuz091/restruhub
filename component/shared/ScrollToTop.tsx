"use client";

export default function ScrollToTop({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
}