import "./Starfield.css"
import React, { useRef, useEffect } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const numStars = 1000;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width,
        y: (Math.random() - 0.5) * canvas.height,
        z: Math.random() * canvas.width,
      });
    }

    const drawStars = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.z -= 4; // speed toward viewer
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = (Math.random() - 0.5) * canvas.width;
          star.y = (Math.random() - 0.5) * canvas.height;
        }

        const k = 128.0 / star.z;
        const x = star.x * k + canvas.width / 2;
        const y = star.y * k + canvas.height / 2;
        const size = (1 - star.z / canvas.width) * 1.5;
        if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(drawStars);
    };

    drawStars();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return <canvas id="stars-canvas" ref={canvasRef} />;
};

export default Starfield;
