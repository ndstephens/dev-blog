import { Listbox } from '@headlessui/react';
import { AnimatePresence, motion as m } from 'framer-motion';

import { navMenus } from '@config/animations/menu';
import { themeOptionsList, useTheme, useThemeIcons } from '@hooks/useTheme';

const { child, container } = navMenus;

interface ThemeSelectProps {
  className?: string;
}

export default function ThemeSelect({ className }: ThemeSelectProps) {
  const [selectedTheme, setSelectedTheme] = useTheme();
  const themeIcons = useThemeIcons();

  if (!selectedTheme) {
    return null;
  }

  const SelectedThemeIcon = themeIcons[selectedTheme.value];

  return (
    <Listbox
      value={selectedTheme}
      by="value"
      onChange={setSelectedTheme}
      as="div"
      className={`relative isolate flex items-center justify-between md:-mr-6 ${className}`}
    >
      {({ open }) => (
        // "open" needed for AnimatePresence to work
        <>
          <Listbox.Label className="md:sr-only">Theme:</Listbox.Label>
          <Listbox.Button className="z-10 flex h-full place-items-center py-2 px-4 text-textClr-1 max-md:rounded max-md:bg-surfaceClr-1/60 md:py-0 md:px-6">
            <span className="md:sr-only">{selectedTheme.label}</span>
            <SelectedThemeIcon
              aria-hidden
              className="ml-3 w-[1.25rem] md:ml-0"
            />
          </Listbox.Button>

          <AnimatePresence>
            {open && (
              <Listbox.Options
                static
                as={m.ul}
                variants={container}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.17 }}
                className="absolute top-full right-0 max-md:bg-surfaceClr-3 md:rounded-b md:backdrop-blur-lg"
              >
                {themeOptionsList.map((themeOption) => {
                  const { label, value } = themeOption;
                  const Icon = themeIcons[value];
                  return (
                    <Listbox.Option
                      key={value}
                      as={m.li}
                      variants={child}
                      value={themeOption}
                      className="my-2 flex cursor-pointer items-center justify-between py-1 px-4 transition-colors ui-selected:text-textClr-1 ui-active:text-textClr-1 md:px-6"
                    >
                      <span>{label}</span>
                      <Icon aria-hidden className="ml-3 w-[1.25rem]" />
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            )}
          </AnimatePresence>
        </>
      )}
    </Listbox>
  );
}
