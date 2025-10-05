import { Link } from "wouter";

export default function Navbar() {
  return (
    <header className="glass sticky top-0 z-50 shadow-sm" data-testid="navbar">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center cursor-pointer">
              <span className="ml-2 text-foreground" style={{ font: '700 20px/28px "Times New Roman", serif' }}>FINBRIDGE</span>
            </div>
          </Link>

          <div className="flex font-medium">
            <Link href="/" className="block">
              <div style={{ font: '500 14px/20px Times New Roman, serif', position: 'relative', transitionDuration: '0.15s', transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
                Home
              </div>
            </Link>

            <Link href="/screener" className="block" style={{ marginLeft: '24px' }}>
              <div style={{ font: '500 14px/20px Times New Roman, serif', position: 'relative', transitionDuration: '0.15s', transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
                Screener
              </div>
            </Link>

            <Link href="/smif" className="block" style={{ marginLeft: '24px' }}>
              <div style={{ font: '500 14px/20px Times New Roman, serif', position: 'relative', transitionDuration: '0.15s', transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
                MAYS SMIF
              </div>
            </Link>

            <Link href="/scholars" className="block" style={{ marginLeft: '24px' }}>
              <div style={{ font: '500 14px/20px Times New Roman, serif', position: 'relative', transitionDuration: '0.15s', transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
                Scholars
              </div>
            </Link>

            <Link href="/about" className="block" style={{ marginLeft: '24px' }}>
              <div style={{ position: 'relative', display: 'inline', transitionDuration: '0.15s', transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', font: '500 14px/20px Times New Roman, serif' }}>
                <div style={{ fontFamily: 'Times New Roman, serif' }}>About Us</div>
                <div style={{ bottom: '-4px', fontWeight: 500, height: '2px', left: 0, position: 'absolute', right: 0 }} />
              </div>
            </Link>

            <Link href="/learn" className="block" style={{ marginLeft: '24px' }}>
              <div style={{ font: '500 14px/20px Times New Roman, serif', position: 'relative', transitionDuration: '0.15s', transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
                Learn
              </div>
            </Link>
          </div>

          <div style={{ backgroundImage: 'linear-gradient(135deg, rgb(54, 143, 231) 0%, rgb(25, 117, 210) 100%)', borderRadius: '12px', color: 'rgb(255, 255, 255)', display: 'block', fontSize: '14px', fontWeight: 500, lineHeight: '20px', textDecoration: 'rgb(255, 255, 255)', transitionDuration: '0.15s', transitionProperty: 'opacity', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', backgroundColor: 'rgba(0, 0, 0, 0)', borderColor: 'rgba(0, 0, 0, 0)', padding: '8px 16px' }}>
            Get Started
          </div>
        </div>
      </nav>
    </header>
  );
}
