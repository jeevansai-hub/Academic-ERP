import React from 'react';

export const AuthLayout = ({ children, leftPanelContent }: { children: React.ReactNode, leftPanelContent?: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] h-screen overflow-hidden">
      {/* Left Panel */}
      <div className="hidden md:flex flex-col relative bg-blue-deep pt-[48px] pb-[48px] px-[52px]">
        {/* SVG filter for grain */}
        <svg style={{ display: 'none' }}>
          <filter id="grainy">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.4 0" />
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
        </svg>

        {/* Ambient & grain background layers */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{ filter: 'url(#grainy)' }}></div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        

        {/* Blobs */}
        <div className="absolute top-0 right-0 w-[320px] h-[320px] bg-blue-accent/25 rounded-full blur-[70px] mix-blend-screen animate-[blobDrift_14s_ease-in-out_infinite_alternate]"></div>
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-blue-accent/15 rounded-full blur-[70px] mix-blend-screen animate-[blobDrift_10s_ease-in-out_infinite_alternate-reverse]"></div>
        
        {/* Z-10 Content */}
        <div className="relative z-10 flex flex-col h-full">
          {leftPanelContent}
        </div>
      </div>

      {/* Right Panel */}
      <div className="relative bg-white flex flex-col justify-center overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(rgba(30,110,245,0.045) 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>
        
        {/* Corner marks via before/after approach (simplified with absolute divs) */}
        <div className="absolute top-0 right-0 w-[120px] h-[120px] border-t-[1.5px] border-r-[1.5px] border-border-bluegrey pointer-events-none m-4"></div>
        <div className="absolute bottom-0 left-0 w-[120px] h-[120px] border-b-[1.5px] border-l-[1.5px] border-border-bluegrey pointer-events-none m-4"></div>

        <div className="relative z-10 w-full max-w-[420px] mx-auto py-[48px] px-[52px]">
          {children}
        </div>
      </div>
    </div>
  );
};
