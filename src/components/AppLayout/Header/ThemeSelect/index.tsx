import { Listbox } from '@headlessui/react';
import { AnimatePresence, motion as m } from 'framer-motion';

import { themeOptionsList, useTheme, useThemeIcons } from '@hooks/useTheme';

export default function ThemeSelect() {
  const [selectedTheme, setSelectedTheme] = useTheme();
  const themeIcons = useThemeIcons();

  if (!selectedTheme) {
    return null;
  }

  const SelectedIcon = themeIcons[selectedTheme.value];

  return (
    <Listbox
      value={selectedTheme}
      by="value"
      onChange={setSelectedTheme}
      as="div"
      className="relative -mr-5"
    >
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">UI Theme:</Listbox.Label>
          <Listbox.Button className="flex place-items-center px-5 text-textClr-1 md:h-full">
            <SelectedIcon
              aria-hidden
              aria-labelledby="selectedTheme"
              className="w-5"
            />
            <span className="sr-only" id="selectedTheme">
              {selectedTheme.label}
            </span>
          </Listbox.Button>

          <AnimatePresence>
            {open && (
              <Listbox.Options
                static
                as={m.ul}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.17 }}
                className="overflow-hidden backdrop-blur-lg md:absolute md:top-full md:right-0"
              >
                {themeOptionsList.map((themeOption) => {
                  const { label, value } = themeOption;
                  const Icon = themeIcons[value];
                  return (
                    <Listbox.Option
                      key={value}
                      value={themeOption}
                      className="flex cursor-pointer items-center justify-between px-5 ui-selected:text-textClr-1 ui-active:text-textClr-1 md:h-9"
                    >
                      <span>{label}</span>
                      <Icon className="ml-3 w-5" />
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
