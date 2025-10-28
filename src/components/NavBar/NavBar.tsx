"use client";

import { PrismicImage } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import styles from "./navbar.module.css";

type NavBarProps = {
  navbar: any
}

export default function Navbar({navbar}: NavBarProps) { 
  return (
    <div className={styles.navbar_container}>
        <div className={styles.navbar}>
            <PrismicNextImage field={navbar.data.logo} />

            <div className={styles.links}>
                {navbar.data.link.map((link: any) => (
                    <PrismicNextLink key={link.key} field={link} className={styles.link}/>
                ))}
            </div>

            {navbar.data.cta.map((link: any) => (
                <PrismicNextLink key={link.key} field={link} className={styles.cta} />
            ))}
        </div>
    </div>
  )
}
