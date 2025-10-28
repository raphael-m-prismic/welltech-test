import React from 'react'
import { RichTextField } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

import Container from '../Container/Container'

import styles from "./hero.module.css";

type HeroProps = {
  title: RichTextField,
  description: RichTextField
}

export default function Hero({title, description}:HeroProps) {
  return (
      <div className={styles.hero}>
        <Container>
          <PrismicRichText field={title} components={{
            heading1: ({children}) => (
              <h1 className={styles.title}>{children}</h1>
            )
          }}/>
          <PrismicRichText field={description} components={{
            paragraph: ({children}) => (
              <p className={styles.description}>{children}</p>
            )
          }}/>
        </Container>
      </div>
  )
}
