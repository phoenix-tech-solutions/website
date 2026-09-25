import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button, Container, Icon } from "../primitives";
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
    const update = () => setScrolled(scrollY > 8);
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
              <NavLink key={item.href} to={item.href} viewTransition>
                {item.label}
              </NavLink>
            ))}
            <Button to="/start" variant="accent">
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
      <div className="mobile-menu__top">
        <button className="menu-close" type="button" onClick={onClose}>
          <span className="sr-only">Close menu</span>
          <Icon name="close" />
        </button>
      </div>
      <nav aria-label="Main">
        <NavLink to="/" end viewTransition onClick={onClose}>
          Home
        </NavLink>
        {site.nav.map((item) => (
          <NavLink key={item.href} to={item.href} viewTransition onClick={onClose}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Button to="/start" variant="accent" size="lg" onClick={onClose}>
        Start a project
      </Button>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-top">
          <div className="footer-brand">
            <Lockup />
            <p className="muted">
              Free websites and apps for community organizations in {site.location}.
            </p>
          </div>
          <nav aria-label="Footer" className="footer-nav">
            <Link to="/work" viewTransition>
              Work
            </Link>
            <Link to="/about" viewTransition>
              About
            </Link>
            <Link to="/start" viewTransition>
              Start a project
            </Link>
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          </nav>
        </div>
        <p className="footer-legal muted">
          © {new Date().getFullYear()} {site.name}. {site.sponsor}
        </p>
      </Container>
    </footer>
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
