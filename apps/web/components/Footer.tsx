import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface-800 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-sm text-white mb-4">Platforms</h3>
            <ul className="space-y-2">
              <FooterLink href="/entertainment" label="Entertainment" />
              <FooterLink href="/sports" label="Sports" />
              <FooterLink href="/music" label="Music" />
              <FooterLink href="/events" label="Events" />
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-white mb-4">Community</h3>
            <ul className="space-y-2">
              <FooterLink href="/podcasts" label="Podcasts" />
              <FooterLink href="/community" label="Community" />
              <FooterLink href="/business" label="Business" />
              <FooterLink href="/lifestyle" label="Lifestyle" />
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-white mb-4">Creators</h3>
            <ul className="space-y-2">
              <FooterLink href="/studio" label="Studio" />
              <FooterLink href="/music/charts" label="Charts" />
              <FooterLink href="/events/kopala-tour" label="Kopala Tour" />
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-white mb-4">Indimba</h3>
            <ul className="space-y-2">
              <FooterLink href="/about" label="About" />
              <FooterLink href="/careers" label="Careers" />
              <FooterLink href="/privacy" label="Privacy" />
              <FooterLink href="/terms" label="Terms" />
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex items-center 
                        justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indimba-red-500 rounded flex items-center 
                            justify-center font-black text-xs text-white">I</div>
            <span className="font-display text-sm tracking-wider text-white">INDIMBA</span>
          </div>
          <p className="text-xs text-surface-400">
            &copy; {new Date().getFullYear()} Indimba Digital. Africa&apos;s Story, Africa&apos;s Stage.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="text-sm text-surface-300 hover:text-white transition-colors">
        {label}
      </Link>
    </li>
  );
}
