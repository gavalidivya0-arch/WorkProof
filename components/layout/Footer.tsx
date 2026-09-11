import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#E7E4DF] bg-[#FAFAF8]">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Intro */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="font-serif text-[26px] font-bold text-[#075E63] group-hover:opacity-90 transition-opacity leading-none">
                WP
              </span>
              <span className="text-[12px] font-medium tracking-[1.8px] text-[#073F48] uppercase">
                WORKPROOF
              </span>
            </Link>
            <p className="mt-4 text-[13.5px] text-[#6B7375] leading-relaxed">
              Turn your freelance projects into tamper-proof verified proof that builds instant client trust.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-serif font-bold text-[14px] text-[#073F48] uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2.5 text-[13.5px] text-[#6B7375]">
              <li><Link href="#how-it-works" className="hover:text-[#075E63] transition-colors">How It Works</Link></li>
              <li><Link href="/talent" className="hover:text-[#075E63] transition-colors">Find Talent</Link></li>
              <li><Link href="#pricing" className="hover:text-[#075E63] transition-colors">Pricing</Link></li>
              <li><Link href="/login" className="hover:text-[#075E63] transition-colors">Member Sign In</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-serif font-bold text-[14px] text-[#073F48] uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2.5 text-[13.5px] text-[#6B7375]">
              <li><Link href="/#how-it-works" className="hover:text-[#075E63] transition-colors">Verification Guide</Link></li>
              <li><Link href="/talent" className="hover:text-[#075E63] transition-colors">Talent Directory</Link></li>
              <li><Link href="mailto:support@workproof.com" className="hover:text-[#075E63] transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif font-bold text-[14px] text-[#073F48] uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2.5 text-[13.5px] text-[#6B7375]">
              <li><Link href="#" className="hover:text-[#075E63] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#075E63] transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-[#075E63] transition-colors">Security & Trust</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with Social Links and Copyright */}
        <div className="mt-12 pt-8 border-t border-[#E7E4DF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#6B7375]">
            © {new Date().getFullYear()} WorkProof. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-[#075E63]">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#073F48] transition-colors hover:scale-110 transform duration-150 cursor-pointer"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-[#073F48] transition-colors hover:scale-110 transform duration-150 cursor-pointer"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-[#073F48] transition-colors hover:scale-110 transform duration-150 cursor-pointer"
            >
              <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
