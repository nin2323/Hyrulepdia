import { useRef, useState, useEffect } from 'react';

export const useCardTilt = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{ transform: string; boxShadow: string; [key: string]: any }>({
    transform: '',
    boxShadow: 'none',
  });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -60;
      const rotateY = ((x / rect.width) - 0.5) * 60;

      const shadowX = -(rotateY / 2);
      const shadowY = (rotateX / 2);

      const glowX = -(rotateY / 2);
      const glowY = (rotateX / 2);

      const glow = `radial-gradient(circle at ${50 + glowX}% ${50 + glowY}%, rgba(238, 203, 8, 0.3), transparent 90%)`;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        boxShadow: `${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.71)`,
        '--glow': glow,
      });
    };

    const handleMouseLeave = () => {
      setStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        boxShadow: 'none',
        '--glow': 'transparent',
      });
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
