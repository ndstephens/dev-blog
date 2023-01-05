import { Variants } from 'framer-motion';

// This is being used b/c translating the container's "y" caused a small flash due to the blurred background being over the darker Header background for a short time.  Now the container fades in but it's position is stagnant.  The child elements translate into view separately.
export const dropDownMenus = {
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        // staggerChildren: 0.05,
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  } as Variants,
  child: {
    initial: { y: -10 },
    animate: {
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  } as Variants,
};

//

export const navMobileMenu = {
  overlay: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
      },
    },
  } as Variants,
  panel: {
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        type: 'spring',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  } as Variants,
};
