import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../assets/logo.png"
import { Home, BookOpen, BookMarked, Users, Contact } from 'lucide-react'
import { navbarStyles } from '../assets/dummyStyles' 

// Renamed to 'navItems' to match the screenshot convention
const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Courses", icon: BookOpen, href: "/courses" },
  { name: "About", icon: BookMarked, href: "/about" },
  { name: "Faculty", icon: Users, href: "/faculty" },
  { name: "Contact", icon: Contact, href: "/contact" },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNavbar, setShownavbar] = useState(true)
  
  // This helper function matches the screenshot logic
  const desktopLinkClass = (isActive) =>
    `${navbarStyles.desktopNavItem} ${isActive ? navbarStyles.desktopNavItemActive : ''}`

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
            <span className="text-xl font-bold">SkillForge</span>
          </div>

          {/* Desktop Navigation - EXTRACTED FROM SCREENSHOT */}
          <div className={navbarStyles.desktopNav}>
             <div className={navbarStyles.desktopNavContainer}>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink 
                      key={item.name} 
                      to={item.href}
                      // ensures the "Home" link doesn't stay active on other pages
                      end={item.href === '/'} 
                      // Uses the helper function extracted from the screenshot
                      className={({isActive}) => desktopLinkClass(isActive)}
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

        </div>
      </div>
    </nav>
  );
};

export default Navbar;