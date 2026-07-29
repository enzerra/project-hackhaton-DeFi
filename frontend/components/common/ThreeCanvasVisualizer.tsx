'use client';

import React, { useEffect, useRef } from 'react';

export const ThreeCanvasVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 320);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 320;
    };
    window.addEventListener('resize', handleResize);

    // 3D Nodes
    const numNodes = 28;
    const nodes: { x: number; y: number; z: number; radius: number; baseR: number; speed: number; angle: number; color: string }[] = [];

    const colors = ['#0070F3', '#10B981', '#7928CA', '#FF5B4F', '#00F2FE'];

    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * Math.PI * 2;
      const baseR = 90 + Math.random() * 40;
      nodes.push({
        x: 0,
        y: 0,
        z: 0,
        radius: 4 + Math.random() * 3,
        baseR,
        speed: (Math.random() - 0.5) * 0.015,
        angle,
        color: colors[i % colors.length],
      });
    }

    let rotX = 0.3;
    let rotY = 0;

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotY += 0.008;
      const targetRotX = (mouseY / height - 0.5) * 0.8;
      rotX += (targetRotX - rotX) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2;

      // Project 3D to 2D
      const projected: { x: number; y: number; z: number; color: string; radius: number }[] = [];

      nodes.forEach((node) => {
        node.angle += node.speed;
        const rawX = Math.cos(node.angle) * node.baseR;
        const rawY = Math.sin(node.angle * 2) * 25;
        const rawZ = Math.sin(node.angle) * node.baseR;

        // Rotate Y
        const x1 = rawX * Math.cos(rotY) - rawZ * Math.sin(rotY);
        const z1 = rawX * Math.sin(rotY) + rawZ * Math.cos(rotY);

        // Rotate X
        const y2 = rawY * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = rawY * Math.sin(rotX) + z1 * Math.cos(rotX);

        const fov = 300;
        const scale = fov / (fov + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        projected.push({
          x: projX,
          y: projY,
          z: z2,
          color: node.color,
          radius: node.radius * scale,
        });
      });

      // Sort by Z for depth rendering
      projected.sort((a, b) => b.z - a.z);

      // Draw connecting atomic lines
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.35;
            ctx.strokeStyle = `rgba(0, 112, 243, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw 3D Nodes
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Central Atomic Smart Contract Core
      ctx.beginPath();
      ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#171717';
      ctx.strokeStyle = '#0070F3';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#0070F3';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('▲ BOT', centerX, centerY);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full relative flex flex-col items-center justify-center my-6">
      <div className="absolute top-2 left-4 text-[10px] font-mono text-slate-400 bg-white/80 px-2 py-0.5 rounded border border-slate-200 shadow-xs z-10">
        Interactive 3D WebGL Mesh (Move Mouse to Tilt)
      </div>
      <canvas ref={canvasRef} className="w-full rounded-2xl bg-slate-900/5 border border-slate-200" />
    </div>
  );
};
