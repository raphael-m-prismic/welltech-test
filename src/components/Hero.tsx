import React from 'react'
import { RichTextField } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

import Container from './Container'

type HeroProps = {
  title: RichTextField,
  description: RichTextField
}

export default function Hero({title, description}:HeroProps) {
  return (
      <div className='hero'>
        <Container>
          <PrismicRichText field={title} components={{
            heading1: ({children}) => (
              <h1 className='title'>{children}</h1>
            )
          }}/>
          <PrismicRichText field={description} components={{
            paragraph: ({children}) => (
              <p className='description'>{children}</p>
            )
          }}/>
        </Container>
        <style> 
          {`
            .hero{
              position: relative;
              width: 100%;
              height: 100%;
              min-height: 50vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background-color: #0B0B0B;
              }
            .hero::before{
              content: '';
              z-index: 0;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: url('/hero-bg.png') no-repeat center;
              background-size: cover;
            }
            .title{
              max-width: 50%;
              font-size: 52px;
              font-style: bold;
              font-weight: 700;
              text-transform: uppercase;
            }
            .description{
              max-width: 50%;
              font-size: 24px;
              font-style: regular;
              font-weight: 400;
            }
          `}
        </style>
      </div>
  )
}
