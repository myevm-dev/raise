import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Background.css';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext('2d');
    const cw = c.width = window.innerWidth;
    const ch = c.height = window.innerHeight * 0.9;
    const dots = Array(999).fill().map(() => ({
      x: cw * Math.random(),
      y: -10,
      r: gsap.utils.random(1.5, 4.5, 0.1),
    }));
    const dur = 25;
    const hue = 270;
    const mPos = { x: cw / 2, y: ch };

    c.onpointermove = (e) => gsap.to(mPos, { x: e.offsetX, y: e.offsetY });

    function drawDot(x, y, r) {
      const dist = Math.abs(x - mPos.x) + Math.abs(y - mPos.y);
      ctx.fillStyle = `hsl(${hue},100%,${Math.max(1 - dist / (dots.length - 1), 0.5) * 80}%)`;
      ctx.beginPath();
      ctx.arc(x, y, r * r * Math.max(1 - dist / (dots.length - 1), 0.1), 0, 2 * Math.PI);
      ctx.fill();
    }

    function redraw() {
      ctx.clearRect(0, 0, cw, ch);
      dots.forEach(dot => drawDot(dot.x, dot.y, dot.r));
    }

    gsap.timeline({ onUpdate: redraw })
      .from(dots, {
        duration: dur,
        ease: 'none',
        x: () => `+=${gsap.utils.random(-99, 99)}`,
        y: (i, t) => t.r * ch,
        r: () => `+=${gsap.utils.random(-1, 2)}`,
        repeatRefresh: true,
        stagger: { from: 'random', amount: dur, repeat: -1 },
      })
      .seek(dur);

    const handleResize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight * 0.9;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Background;
