import ModeToggle from "@/components/ModeToggle";

export default function Footer() {
  return (
    <footer>
      <div className="flex items-center justify-center h-16 bg-background border-t gap-4">
        <p className="text-muted-foreground">
          © 2024 Acme. All rights reserved.
        </p>
        <ModeToggle />
      </div>
    </footer>
  );
}
