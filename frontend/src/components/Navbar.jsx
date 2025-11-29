import React, { useState } from 'react'
import logo from "../assets/logo.png"
import { Home } from 'lucide-react'

// The video instructs to import 'navbarStyles' from a dummy data file here
import { navbarStyles } from '../assets/dummyStyles' 

const navItem =[
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
            <div className={navbarStyles.desktopNav}>
                <div className={navbarStyles.container}>

                </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </nav>

  );
};

export default Navbar