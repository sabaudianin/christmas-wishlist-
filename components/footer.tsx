import { Garland } from "@/components/garland";
export function Footer() {
  return (
    <footer className="mx-auto w-full px-8 pb-12 pt-6 text-center text-sm text-cream-100/70 sm:px-10">
      <Garland />
      <p>© 2026 Rafał Bobko</p>
      <a
        href="https://dev-landing-page-murex.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-gold-300 underline decoration-gold-500/50 underline-offset-4 hover:text-gold-400"
      >
        Zobacz więcej moich projektów
      </a>
    </footer>
  );
}
