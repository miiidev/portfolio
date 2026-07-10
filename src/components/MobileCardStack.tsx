import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import type { Project } from '../data';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing [touch-action:pan-y]"
      style={{ x, y, rotateX, rotateY }}
      drag="x"
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface MobileCardStackProps {
  projects: Project[];
  onIndexChange?: (index: number) => void;
  animationConfig?: { stiffness: number; damping: number };
  sensitivity?: number;
}

export default function MobileCardStack({
  projects,
  onIndexChange,
  animationConfig = { stiffness: 260, damping: 20 },
  sensitivity = 200,
}: MobileCardStackProps) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [stack, setStack] = useState<{ id: number; project: Project; rotation: number }[]>(() =>
    projects.map((project, index) => ({
      id: index + 1,
      project,
      rotation: Math.random() * 10 - 5,
    }))
  );

  const sendToBack = (id: number) => {
    setHasInteracted(true);
    setStack((prev) => {
      const newStack = [...prev];
      const index = newStack.findIndex((card) => card.id === id);
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    const topIndex = stack.length > 0
      ? projects.findIndex((p) => p.id === stack[stack.length - 1].project.id)
      : 0;
    if (onIndexChange) onIndexChange(topIndex >= 0 ? topIndex : 0);
  }, [stack, projects, onIndexChange]);

  return (
    <div className="relative w-full h-full" style={{ perspective: '600px' }}>
      {stack.map((card, index) => {
        const isTop = index === stack.length - 1;
        const scale = 1 + index * 0.06 - stack.length * 0.06;
        const rotate = (stack.length - index - 1) * 4 + card.rotation;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="rounded-xl overflow-hidden w-full h-full"
              onClick={() => sendToBack(card.id)}
              animate={{
                rotateZ: isTop ? 0 : rotate,
                scale: isTop ? 0.9 : scale * 0.9,
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              <ProjectCard project={card.project} isCenter={isTop} />
            </motion.div>
          </CardRotate>
        );
      })}

      <motion.div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: hasInteracted ? 0 : 1, y: hasInteracted ? 10 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 backdrop-blur-sm border border-edge text-xs text-muted font-medium">
          <motion.span
            animate={{ x: [-4, 4, -4] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ←
          </motion.span>
          Swipe
          <motion.span
            animate={{ x: [-4, 4, -4] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
