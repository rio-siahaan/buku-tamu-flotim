export default function StickySection({
  children,
  zIndex,
  className = "",
}: {
  children: React.ReactNode;
  zIndex: number;
  className?: string;
}) {
  return (
    <div
      className={`sticky top-0 ${className}`}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
}