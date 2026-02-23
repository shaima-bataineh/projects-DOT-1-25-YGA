'use client';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";
  const isTransparentPage =
    pathname === "/about" || pathname === "/contact" || pathname === "/services";

  // تحقق من حالة تسجيل الدخول من السيرفر (HttpOnly Cookie)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // بدل null خلي false أولًا

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => setIsLoggedIn(data.loggedIn))
      .catch(() => setIsLoggedIn(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    router.push("/"); // تحويل للصفحة الرئيسية بعد Logout
  };

  return (
    <nav
      className={`navbar navbar-expand-lg custom-navbar
        ${isHome || isTransparentPage ? "transparent" : "solid"}
        ${isTransparentPage ? "static-transparent" : ""}`}
    >
      <div className="container">
        <Link className="navbar-brand logo" href="/">Sales<span>Flow</span></Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {[{ href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/services", label: "Services" },
              { href: "/contact", label: "Contact" }
            ].map((item) => (
              <li className="nav-item" key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Buttons حسب حالة تسجيل الدخول */}
            {isLoggedIn ? (
              <li className="nav-item ms-lg-4">
                <button onClick={handleLogout} className="nav-link btn btn-link">
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item ms-lg-3">
                <Link href="/get-started" className="cta-custom-btn">Get Started</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
