import { useEffect, useState } from 'react';

import {
  useEventListener,
  useMediaQuery,
  useOnClickOutside,
} from 'usehooks-ts';

export function useNavHoverAndClick<T extends HTMLElement = HTMLElement>(
  elementRef: React.RefObject<T>
) {
  // MEDIA QUERY
  const isLargeScreen = useMediaQuery('(min-width: 768px)');
  const isMouseDevice = useMediaQuery('(hover: hover) and (pointer: fine)');

  // MENU DISPLAY STATE AND EVENT HANDLERS
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //* HANDLE SCREEN SIZE EVENTS
  useEffect(() => {
    if (isLargeScreen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isLargeScreen]);

  //* HANDLE MOUSE HOVER EVENTS
  const handleMouseEnter = () => {
    if (isLargeScreen && isMouseDevice) {
      setIsOpen(true);
    }
  };
  const handleMouseLeave = () => {
    if (isLargeScreen && isMouseDevice) {
      setIsOpen(false);
    }
  };
  useEventListener('mouseenter', handleMouseEnter, elementRef);
  useEventListener('mouseleave', handleMouseLeave, elementRef);

  //* HANDLE NAV/MENU CLICK EVENTS
  const handleToggleMenu = () => {
    if (isLargeScreen && !isMouseDevice) {
      setIsOpen((ps) => !ps);
    }
  };
  const handleCloseMenu = () => {
    if (isLargeScreen) {
      setIsOpen(false);
    }
  };

  //* HANDLE CLICK-OUTSIDE EVENTS
  const handleClickOutside = () => {
    if (isLargeScreen && !isMouseDevice) {
      setIsOpen(false);
    }
  };
  useOnClickOutside(elementRef, handleClickOutside);

  return [isOpen, handleToggleMenu, handleCloseMenu] as const;
}
