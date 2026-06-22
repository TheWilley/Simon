import { useMemo, type RefObject } from 'react';
import { gsap } from 'gsap';

export const useGameAnimations = (
  gameBoardRef: RefObject<HTMLDivElement | null>,
  startButtonRef: RefObject<HTMLButtonElement | null>
) => {
  return useMemo(
    () => ({
      showBoard: () => {
        const tl = gsap.timeline();

        // Fade out the start button
        tl.to(startButtonRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power1.out',
        });

        // Bring back the board
        tl.fromTo(
          gameBoardRef.current,
          {
            autoAlpha: 0,
            y: '100vh',
            rotateX: 360,
            rotateY: 360,
            rotateZ: 180,
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            duration: 0.9,
            ease: 'power2.out',
            clearProps: 'transform,position',
          },
          '<=20%'
        );
      },

      showStart: () => {
        const tl = gsap.timeline();

        // Drop board
        tl.to(gameBoardRef.current, {
          filter: 'grayscale(100%)',
        }).to(
          gameBoardRef.current,
          {
            y: '100vh',
            rotateX: 300,
            rotateY: 300,
            rotateZ: 260,
            duration: 1,
            ease: 'power1.in',
            onComplete: () => {
              gsap.set(gameBoardRef.current, { autoAlpha: 0 });
            },
          },
          '-=0.3'
        );

        // Fade in the start button after the board is gone
        tl.to(
          startButtonRef.current,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power1.in',
          },
          '>-0.1'
        );
      },

      flash: (element: Element) => {
        const target = element || gameBoardRef.current;
        if (!target) return;

        // Force it back to normal baseline before restarting
        gsap.set(target, { filter: 'brightness(100%)' });

        gsap.to(target, {
          keyframes: [
            { filter: 'brightness(200%)', duration: 0.25 },
            { filter: 'brightness(100%)', duration: 0.25 },
          ],
        });
      },
    }),
    [gameBoardRef, startButtonRef]
  );
};
