export const fadeUp = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};
export const sideCenter = {
  initial: {
    x: 0,
  },
  animate: {
    opacity: 0,
    x: 0,
    transition: {
      duration: 0.4,
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
};
export const stagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
export const routeAnimate = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.1,
      ease: "easeInOut",
    },
  },
};
