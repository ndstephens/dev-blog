import { Listbox } from '@headlessui/react';
import { AnimatePresence, motion as m } from 'framer-motion';

import { themeOptionsList, useTheme, useThemeIcons } from '@hooks/useTheme';

interface ThemeSelectProps {
  className?: string;
}

export default function ThemeSelectMobile({ className }: ThemeSelectProps) {
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
      className={`isolate flex items-center justify-between ${className}`}
    >
      {({ open }) => (
        // "open" needed for AnimatePresence to work
        <>
          <Listbox.Label>Theme:</Listbox.Label>
          <Listbox.Button className="z-10 flex h-full place-items-center rounded bg-surfaceClr-1/60 py-2 px-4 text-textClr-1">
            <span>{selectedTheme.label}</span>
            <SelectedThemeIcon aria-hidden className="ml-3 w-[1.25rem]" />
          </Listbox.Button>

          <AnimatePresence>
            {open && (
              <Listbox.Options
                static
                as={m.ul}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[94px] right-6 flex h-[calc(100%-100px)] w-[calc(100%-48px)] flex-col bg-surfaceClr-3"
              >
                {themeOptionsList.map((themeOption) => {
                  const { label, value } = themeOption;
                  const Icon = themeIcons[value];
                  return (
                    <Listbox.Option
                      key={value}
                      as={m.li}
                      value={themeOption}
                      className="my-2 flex h-8 cursor-pointer items-center justify-end px-4 transition-colors ui-selected:text-textClr-1 ui-active:text-textClr-1"
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
