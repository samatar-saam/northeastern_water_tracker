import React, { useState, useEffect } from 'react';
// ✅ Import logo from your assets folder (relative path)
import logo from '../assets/images/logo.png';   // adjust path if component is deeper

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Water Points', href: '#water-points' },
    { name: 'Reports', href: '#reports' },
    { name: 'Map', href: '#map' },
    { name: 'Communities', href: '#communities' },
    { name: 'About Us', href: '#about' },
    { name: 'Service', href: '#service' },
    { name: 'Contact', href: '#contact' },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsLoginDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (name) => {
    setActiveLink(name);
    setIsMobileMenuOpen(false);
    setIsLoginDropdownOpen(false);
  };

  const toggleLoginDropdown = () => {
    setIsLoginDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
        role="banner"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ---- Left: Logo + Brand ---- */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Logo image – imported from assets */}
              <div className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl shadow-md shadow-blue-500/20 overflow-hidden bg-white">
                <img
                  src={logo}   // <-- using imported variable
                  alt="North Eastern Community Water Tracker logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <span className="block font-poppins font-bold text-[#0b1e33] text-sm md:text-base tracking-tight">
                  North Eastern
                </span>
                <span className="block font-poppins font-semibold text-[10px] md:text-xs text-[#1565C0] tracking-wide uppercase opacity-80">
                  Community Water Tracker
                </span>
              </div>
            </div>

            {/* ---- Center: Nav Links (desktop) ---- */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.name)}
                  className={`
                    relative px-3 py-2 text-sm font-medium transition-all duration-300 ease-out rounded-lg
                    hover:text-[#1565C0] group
                    ${activeLink === link.name ? 'text-[#1565C0]' : 'text-[#1e293b]'}
                  `}
                  aria-current={activeLink === link.name ? 'page' : undefined}
                >
                  {link.name}
                  {/* Underline indicator – active & hover */}
                  <span
                    className={`
                      absolute left-1/2 -bottom-1 h-0.5 bg-[#1565C0] rounded-full transition-all duration-300 ease-out
                      ${activeLink === link.name
                        ? 'w-5 -translate-x-1/2 opacity-100'
                        : 'w-0 -translate-x-1/2 opacity-0 group-hover:w-5 group-hover:opacity-100'
                      }
                    `}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>

            {/* ---- Right: Login Dropdown (desktop) ---- */}
            <div className="hidden lg:flex items-center gap-3 relative">
              <button
                onClick={toggleLoginDropdown}
                className="px-5 py-2 text-sm font-semibold text-[#1565C0] bg-white border border-[#1565C0] rounded-full transition-all duration-200 ease-out hover:bg-[#1565C0] hover:text-white hover:shadow-md hover:shadow-blue-500/20 focus:ring-2 focus:ring-[#1565C0] focus:ring-offset-2 flex items-center gap-1.5"
                aria-label="Login options"
                aria-expanded={isLoginDropdownOpen}
                aria-haspopup="true"
              >
                <span>Log In</span>
                <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${isLoginDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true"></i>
              </button>

              {/* Dropdown menu */}
              {isLoginDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#f0f2f5] py-1.5 z-10 animate-fadeIn"
                  role="menu"
                  aria-label="Login options"
                >
                  <a
                    href="#user-login"
                    onClick={() => handleLinkClick('User Login')}
                    className="block px-4 py-2.5 text-sm text-[#1e293b] hover:bg-[#f1f5f9] transition-colors duration-150"
                    role="menuitem"
                  >
                    <i className="fas fa-user mr-2 text-[#1565C0] w-4 text-center" aria-hidden="true"></i>
                    User Login
                  </a>
                  <a
                    href="#admin-login"
                    onClick={() => handleLinkClick('Admin Login')}
                    className="block px-4 py-2.5 text-sm text-[#1e293b] hover:bg-[#f1f5f9] transition-colors duration-150"
                    role="menuitem"
                  >
                    <i className="fas fa-user-shield mr-2 text-[#1565C0] w-4 text-center" aria-hidden="true"></i>
                    Admin Login
                  </a>
                </div>
              )}
            </div>

            {/* ---- Mobile Hamburger ---- */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsLoginDropdownOpen(false);
              }}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#1e293b] hover:bg-[#1565C0]/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:ring-offset-2"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <i
                className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl transition-transform duration-200`}
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>

        {/* ---- Mobile Menu (slide down) ---- */}
        <div
          id="mobile-menu"
          className={`
            lg:hidden overflow-hidden transition-all duration-300 ease-out
            ${isMobileMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
          `}
          role="menu"
          aria-label="Mobile navigation"
        >
          <div className="bg-white/95 backdrop-blur-md border-t border-[#f0f2f5] px-4 py-5 shadow-lg shadow-black/5">
            <nav className="flex flex-col gap-1" aria-label="Mobile main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.name)}
                  className={`
                    px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200
                    ${activeLink === link.name
                      ? 'text-[#1565C0] bg-[#1565C0]/8'
                      : 'text-[#1e293b] hover:bg-[#f1f5f9]'
                    }
                  `}
                  aria-current={activeLink === link.name ? 'page' : undefined}
                  role="menuitem"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex flex-col gap-2">
              {/* Mobile login dropdown (expanded inline) */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                  className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-semibold text-[#1565C0] bg-white border border-[#1565C0] rounded-full transition-colors hover:bg-[#1565C0] hover:text-white"
                  aria-expanded={isLoginDropdownOpen}
                >
                  <span>Log In</span>
                  <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${isLoginDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true"></i>
                </button>
                {isLoginDropdownOpen && (
                  <div className="flex flex-col gap-1 pl-4 mt-1">
                    <a
                      href="#user-login"
                      onClick={() => handleLinkClick('User Login')}
                      className="px-4 py-2 text-sm text-[#1e293b] hover:bg-[#f1f5f9] rounded-lg transition-colors"
                    >
                      <i className="fas fa-user mr-2 text-[#1565C0] w-4 text-center" aria-hidden="true"></i>
                      User Login
                    </a>
                    <a
                      href="#admin-login"
                      onClick={() => handleLinkClick('Admin Login')}
                      className="px-4 py-2 text-sm text-[#1e293b] hover:bg-[#f1f5f9] rounded-lg transition-colors"
                    >
                      <i className="fas fa-user-shield mr-2 text-[#1565C0] w-4 text-center" aria-hidden="true"></i>
                      Admin Login
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Offset spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 md:h-20" aria-hidden="true"></div>
    </>
  );
};

export default Navbar;