
'use client';

import React, { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ClothAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouse = {
        down: false,
        button: 1,
        x: 0,
        y: 0,
        px: 0,
        py: 0
    };

    const cloth = {
        width: 60,
        height: 40,
        spacing: 15,
        tearDist: 60,
        friction: 0.98,
        gravity: 980,
    };
    
    class Point {
        x: number;
        y: number;
        px: number;
        py: number;
        vx: number;
        vy: number;
        piny: number | null;
        pinx: number | null;
        constraints: Constraint[] = [];

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.px = x;
            this.py = y;
            this.vx = 0;
            this.vy = 0;
            this.pinx = null;
            this.piny = null;
        }

        update(delta: number) {
            if (this.pinx !== null && this.piny !== null) {
                this.x = this.pinx;
                this.y = this.piny;
                return;
            }
            if (mouse.down) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (mouse.button === 1) {
                    if (dist < 20) {
                        this.px = this.x - (mouse.x - mouse.px) * 1.8;
                        this.py = this.y - (mouse.y - mouse.py) * 1.8;
                    }
                } else if (dist < cloth.tearDist) {
                   this.constraints = [];
                }
            }
            this.add_force(0, cloth.gravity);
            let nx = this.x + (this.x - this.px) * cloth.friction + this.vx * delta;
            let ny = this.y + (this.y - this.py) * cloth.friction + this.vy * delta;
            this.px = this.x;
            this.py = this.y;
            this.x = nx;
            this.y = ny;
            this.vy = this.vx = 0;
        }

        draw() {
            if (!ctx) return;
            if (this.constraints.length > 0) {
                const p2 = this.constraints[0].p2;
                ctx.lineTo(p2.x, p2.y);
            }
        }

        resolve_constraints() {
            if (this.pinx !== null && this.piny !== null) {
                this.x = this.pinx;
                this.y = this.piny;
                return;
            }
            for (let i = 0; i < this.constraints.length; i++) {
                this.constraints[i].resolve();
            }
            if (this.x > canvas.width) {
                this.x = canvas.width;
            } else if (this.x < 0) {
                this.x = 0;
            }
            if (this.y > canvas.height) {
                this.y = canvas.height;
            } else if (this.y < 0) {
                this.y = 0;
            }
        }
        
        attach(point: Point) {
            this.constraints.push(new Constraint(this, point));
        };

        remove_constraint(constraint: Constraint) {
            this.constraints.splice(this.constraints.indexOf(constraint), 1);
        };
        
        add_force(x: number, y: number) {
            this.vx += x;
            this.vy += y;
        };
        
        pin(pinx: number, piny: number) {
            this.pinx = pinx;
            this.piny = piny;
        };
    }

    class Constraint {
        p1: Point;
        p2: Point;
        length: number = cloth.spacing;
        
        constructor(p1: Point, p2: Point) {
            this.p1 = p1;
            this.p2 = p2;
        }
        
        resolve() {
            let dx = this.p1.x - this.p2.x,
                dy = this.p1.y - this.p2.y,
                dist = Math.sqrt(dx * dx + dy * dy),
                diff = (this.length - dist) / dist;

            let px = dx * diff * 0.5;
            let py = dy * diff * 0.5;

            this.p1.x += px;
            this.p1.y += py;
            this.p2.x -= px;
            this.p2.y -= py;
        }
        
        draw() {
            if (!ctx) return;
            ctx.moveTo(this.p1.x, this.p1.y);
            ctx.lineTo(this.p2.x, this.p2.y);
        }
    }
    
    let points: Point[] = [];

    const start = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const start_x = canvas.width / 2 - cloth.width * cloth.spacing / 2;
        
        for (let y = 0; y <= cloth.height; y++) {
            for (let x = 0; x <= cloth.width; x++) {
                let p = new Point(start_x + x * cloth.spacing, 20 + y * cloth.spacing);
                
                y === 0 && p.pin(p.x, p.y);
                x !== 0 && p.attach(points[points.length - 1]);
                y !== 0 && p.attach(points[x + (y - 1) * (cloth.width + 1)]);

                points.push(p);
            }
        }

        function update() {
            if (!ctx) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < 3; i++) {
                points.forEach(p => p.resolve_constraints());
            }

            ctx.beginPath();
            points.forEach(p => p.update(0.016));
            points.forEach(p => p.draw());
            
            if (theme === 'dark') {
                 ctx.strokeStyle = "rgba(100,100,100, 0.7)";
            } else {
                 ctx.strokeStyle = "rgba(200,200,200, 0.7)";
            }
            
            ctx.stroke();

            animationFrameId = requestAnimationFrame(update);
        }
        
        update();
    }

    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        points = [];
        start();
    }

    const onMouseMove = (e: MouseEvent) => {
        mouse.px = mouse.x;
        mouse.py = mouse.y;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
    
    const onMouseDown = (e: MouseEvent) => {
        mouse.down = true;
        mouse.button = e.button;
    }

    const onMouseUp = () => {
        mouse.down = false;
    }
    
    setCanvasSize();

    window.addEventListener('resize', setCanvasSize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup', onMouseUp);
    };
  }, [theme]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.5 }} />;
};

export default ClothAnimation;
