import { ReactNode, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button, Container, Icon, Rule } from "../primitives";
import { Lockup } from "../brand";
import { site } from "../../content/site";

export function SkipLink() {
  return (
    <a className="skip-link" href="#main">
      Skip to content
    </a>
  );
}
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() =>
      document.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true }),
    );
  }, [pathname]);
  return null;
}
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setScrolled(scrollY > 24);
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  return (
    <>
      <header className="site-header" data-scrolled={scrolled}>
        <Container className="nav-inner">
          <Lockup />
          <nav aria-label="Main" className="desktop-nav">
            {site.nav.map((item) => (
              <NavLink key={item.href} to={item.href}>
                {item.label}
              </NavLink>
            ))}
            <Button href="/start" as="link">
              Start a project
            </Button>
          </nav>
          <button
            ref={trigger}
            type="button"
            className="menu-trigger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Icon name="menu" />
          </button>
        </Container>
      </header>
      <MobileMenu
        open={open}
        onClose={() => {
          setOpen(false);
          requestAnimationFrame(() => trigger.current?.focus());
        }}
      />
    </>
  );
}
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(dialog.current?.querySelectorAll<HTMLElement>("a,button") ?? []);
    focusables()[0]?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const items = focusables();
        if (!items.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      removeEventListener("keydown", key);
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      ref={dialog}
      id="mobile-menu"
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
    >
      <button className="menu-close" type="button" onClick={onClose}>
        <span className="sr-only">Close menu</span>
        <Icon name="close" />
      </button>
      <nav>
        {site.nav.map((item, index) => (
          <NavLink key={item.href} to={item.href} onClick={onClose}>
            <span className="t-mono">0{index + 1}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Button href="/start" as="link" size="lg" onClick={onClose}>
        Start a project
      </Button>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-environment" aria-hidden />
      <div className="footer-panel">
        <div className="footer-grid">
          <div>
            <Lockup />
            <p className="muted measure">Free digital work for community organizations.</p>
          </div>
          <FooterColumn
            title="Work"
            links={[
              ["All work", "/work"],
              ["Start a project", "/start"],
            ]}
          />
          <FooterColumn title="Organization" links={[["About", "/about"]]} />
          <FooterColumn
            title="Connect"
            links={site.email ? [["Email", `mailto:${site.email}`]] : [["Contact", "/start"]]}
          />
        </div>
        <Rule />
        <p className="footer-legal t-mono-sm">{site.legal}</p>
      </div>
    </footer>
  );
}
function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div className="footer-column">
      <p className="t-mono">{title}</p>
      {links.map(([label, href]) => (
        <a key={href} href={href}>
          {label}
        </a>
      ))}
    </div>
  );
}
export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <Nav />
      <ScrollToTop />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
