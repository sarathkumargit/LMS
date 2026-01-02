import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../assets/logo.png"
import { Home, BookOpen, BookMarked, Users, Contact, Menu, X } from 'lucide-react'
import { navbarStyles } from '../assets/dummyStyles' 
import { useAuth, useClerk, UserButton, useUser } from "@clerk/clerk-react"

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Courses", icon: BookOpen, href: "/courses" },
  { name: "About", icon: BookMarked, href: "/about" },
  { name: "Faculty", icon: Users, href: "/faculty" },
  { name: "Contact", icon: Contact, href: "/contact" },
]

const Navbar = () => {
  const { isSignedIn } = useUser();
  const { openSignUp } = useClerk();
  const { getToken } = useAuth();

  const [isOpen, setIsOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNavbar, setShownavbar] = useState(true)
  
  const menuRef = useRef(null);
  const isLoggedIn=isSignedIn && Boolean(localStorage.getItem("token"));
   

  //fetch token
  useEffect(() => {
    const loadToken =async () => {
      if(isSignedIn) {
        const token =await getToken();
        localStorage.setItem("token",token);
        console.log("clerk login Token:",token);
      }
    };
    loadToken(); 
  },[isSignedIn,getToken])
  
  //remove token when signout
  useEffect(() => {
    if(!isSignedIn){
      localStorage.removeItem('token');
      console.log('clerk token removed')
    }
  },[isSignedIn]
  )

  // INSTANT token removal using Clerk logout event
  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      console.log("Token removed instantly on Clerk logout event");
    };

    window.addEventListener("user:signed_out", handleLogout);
    return () => window.removeEventListener("user:signed_out", handleLogout);
  }, []);

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (scrollY > lastScrollY && scrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);


  const desktopLinkClass = (isActive) =>
    `${navbarStyles.desktopNavItem} ${isActive ? navbarStyles.desktopNavItemActive : ''}`

  const mobileLinkClass = (isActive) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-gray-100'
    }`

  return (
    <nav
      className={`${navbarStyles.navbar} ${
        showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden
      } ${
        isScrolled ? navbarStyles.navbarScrolled : navbarStyles.navbarDefault
      }`}
    >
      <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
          {/* LOGO */}
          <div className="flex items-center gap-3 select-none">
            <img src={logo} alt="logo" className="w-12 h-12" />
            <span className="text-xl font-bold bg-clip-text">SkillForge</span>
          </div>

          {/* Desktop Navigation */}
          <div className={navbarStyles.desktopNav}>
            <div className={navbarStyles.desktopNavContainer}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink 
                    key={item.name} 
                    to={item.href}
                    end={item.href === '/'} 
                    className={({ isActive }) => desktopLinkClass(isActive)}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon size={16} className={navbarStyles.desktopNavIcon} />
                      <span>{item.name}</span>
                    </div>
                  </NavLink>
                )
              })}
            </div>
          </div>

          {/* Right side - Desktop */}
          <div className={navbarStyles.authContainer}>
            {!isSignedIn ? (
              <button 
                type="button" 
                onClick={() => openSignUp({})} 
                className={navbarStyles.createAccountButton ?? navbarStyles.loginButton}
              >
                <span>Create Account</span>
              </button>
            ) : (
              <div className="flex items-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div ref={menuRef} className="md:hidden bg-white border-t shadow-lg">
            <div className="flex flex-col space-y-2 px-4 py-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    end={item.href === '/'}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => mobileLinkClass(isActive)}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </NavLink>
                )
              })}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t">
                {!isSignedIn ? (
                  <button
                    onClick={() => {
                      openSignUp({});
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Create Account
                  </button>
                ) : (
                  <div className="flex items-center justify-center">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;