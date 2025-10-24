import React from 'react'

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({children}: ContainerProps) {
  return (
    <div className='container'>
        {children}
        <style>{`
          .container{
            z-index: 10;
            width: 100%;
            height: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 2rem;
          }
        `}</style>
    </div>
  )
}
