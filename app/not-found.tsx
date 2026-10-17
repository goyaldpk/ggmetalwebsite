import Link from "next/link";
import { enquire } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="drawing-grid">
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="font-mono text-6xl font-semibold text-accent/30">404</p>
        <h1 className="mt-4 text-3xl font-semibold">This part isn’t in our catalogue</h1>
        <p className="mt-3 text-slate-600">The page you were looking for doesn’t exist. Find what you need from the menu, or ask us directly.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="rounded-md bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-accent">Home</Link>
          <Link href={enquire()} className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
