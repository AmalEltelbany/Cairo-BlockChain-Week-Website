import { FC, CSSProperties } from 'react';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

interface CustomCSSProperties extends CSSProperties {
  '--after-duration': string;
  '--before-duration': string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = ''
}) => {
  const inlineStyles: CustomCSSProperties = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
  };

  return (
    <>
      <style>
        {`
          @keyframes glitch-anim {
            0% { clip-path: inset(20% 0 50% 0); }
            5% { clip-path: inset(10% 0 60% 0); }
            10% { clip-path: inset(15% 0 55% 0); }
            15% { clip-path: inset(25% 0 35% 0); }
            20% { clip-path: inset(30% 0 40% 0); }
            25% { clip-path: inset(40% 0 20% 0); }
            30% { clip-path: inset(10% 0 60% 0); }
            35% { clip-path: inset(15% 0 55% 0); }
            40% { clip-path: inset(25% 0 35% 0); }
            45% { clip-path: inset(30% 0 40% 0); }
            50% { clip-path: inset(20% 0 50% 0); }
            55% { clip-path: inset(10% 0 60% 0); }
            60% { clip-path: inset(15% 0 55% 0); }
            65% { clip-path: inset(25% 0 35% 0); }
            70% { clip-path: inset(30% 0 40% 0); }
            75% { clip-path: inset(40% 0 20% 0); }
            80% { clip-path: inset(20% 0 50% 0); }
            85% { clip-path: inset(10% 0 60% 0); }
            90% { clip-path: inset(15% 0 55% 0); }
            95% { clip-path: inset(25% 0 35% 0); }
            100% { clip-path: inset(30% 0 40% 0); }
          }
          
          .glitch-container {
            position: relative;
            display: inline-block;
          }
          
          .glitch-container::before,
          .glitch-container::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.8;
          }
          
          .glitch-container::before {
            left: -3px;
            text-shadow: ${enableShadows ? '3px 0 #00E3D8' : 'none'};
            animation: ${enableOnHover ? 'none' : 'glitch-anim var(--before-duration) infinite linear alternate-reverse'};
          }
          
          .glitch-container::after {
            left: 3px;
            text-shadow: ${enableShadows ? '-3px 0 #C400FF' : 'none'};
            animation: ${enableOnHover ? 'none' : 'glitch-anim var(--after-duration) infinite linear alternate-reverse'};
          }
          
          .glitch-container:hover::before {
            animation: ${enableOnHover ? 'glitch-anim var(--before-duration) infinite linear alternate-reverse' : ''};
          }
          
          .glitch-container:hover::after {
            animation: ${enableOnHover ? 'glitch-anim var(--after-duration) infinite linear alternate-reverse' : ''};
          }
        `}
      </style>
      <div
        style={inlineStyles}
        data-text={children}
        className={`glitch-container ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default GlitchText;