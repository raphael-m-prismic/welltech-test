"use client";

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import styles from "./navbar.module.css";
import { NavbarDocument } from "../../../prismicio-types";

type NavBarProps = {
  navbar: NavbarDocument
}

export default function Navbar({navbar}: NavBarProps) { 
  return (
    <div className={styles.navbar_container}>
        <div className={styles.navbar}>
            <PrismicNextImage field={navbar.data.logo} />

            <div className={styles.links}>
                {navbar.data.link.map((link) => (
                    <PrismicNextLink key={link.key} field={link} className={styles.link}/>
                ))}
            </div>

            <div className={styles.ctas}>
              {navbar.data.cta.map((link) => (
                <PrismicNextLink key={link.key} field={link} className={styles.cta} />
              ))}
            </div>
        </div>
    </div>
  )
}
