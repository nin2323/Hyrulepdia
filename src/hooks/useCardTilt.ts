import { useRef, useEffect, useState } from 'react';

export const useCardTilt = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const glowEl = card.querySelector('.glow') as HTMLElement;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -60;
      const rotateY = ((x / rect.width) - 0.5) * 60;

      const shadowX = -(rotateY / 2);
      const shadowY = rotateX / 2;

      const glowX = -(rotateY / 2);
      const glowY = rotateX / 2;

      const glow = `radial-gradient(circle at ${50 + glowX}% ${50 + glowY}%, rgba(231, 214, 116, 0.2), transparent 90%)`;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        boxShadow: `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.71)`,
      });

      if (glowEl) {
        glowEl.style.background = glow;
      }
    };

    const handleMouseLeave = () => {
      setStyle({
        transform: `perspective(1000px) rotateX(0deg) rotateY(0deg)`,
        boxShadow: `none`,
      });

      if (glowEl) {
        glowEl.style.background = 'transparent';
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { cardRef, style };
};
