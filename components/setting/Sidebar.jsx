import Link from "next/link";

export default function Sidebar({ className }) {
  return (
    <aside className={`hidden lg:grid gap-4 text-sm text-muted-foreground max-h-20 ${className}`}>
      <Link href="/setting/general">General</Link>
      <Link href="/setting/security">Security</Link>
      <Link href="/setting/support">Support</Link>
    </aside>
  );
}
