import { Listbox } from '@headlessui/react';
import { AnimatePresence, motion as m } from 'framer-motion';

import { dropDownMenus } from '@config/animations/menu';
import { themeOptionsList, useTheme, useThemeIcons } from '@hooks/useTheme';

// animation variants
const { child, container } = dropDownMenus;

export default function ThemeSelectDesktop() {
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
      className="relative isolate -mr-6"
    >
      {({ open }) => (
        // "open" needed for AnimatePresence to work
        <>
          <Listbox.Label className="sr-only">Theme:</Listbox.Label>
          <Listbox.Button className="z-10 flex h-full place-items-center px-6 text-textClr-1">
            <span className="sr-only">{selectedTheme.label}</span>
            <SelectedThemeIcon aria-hidden className="w-[1.25rem]" />
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
                className="absolute top-full right-0 rounded-b backdrop-blur-lg"
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
                      className="my-2 flex h-8 cursor-pointer items-center justify-end px-6 transition-colors ui-selected:text-textClr-1 ui-active:text-textClr-1"
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
