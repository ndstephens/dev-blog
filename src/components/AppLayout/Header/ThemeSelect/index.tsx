import React from 'react';

import { Listbox } from '@headlessui/react';

import { themeOptionsList, useTheme, useThemeIcons } from '@hooks/useTheme';

export default function ThemeSelect() {
  const [selectedTheme, setSelectedTheme] = useTheme();
  const themeIcons = useThemeIcons();

  if (!selectedTheme) {
    return null;
  }

  const SelectedIcon = themeIcons[selectedTheme.value];

  // TODO: finish creating UI

  return (
    <Listbox
      value={selectedTheme}
      by="value"
      onChange={setSelectedTheme}
      as="div"
      className="relative -mr-5"
    >
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
      <Listbox.Options className="backdrop-blur-lg md:absolute md:top-full md:right-0 md:min-w-full md:divide-y-2 md:divide-surfaceClr-2">
        {themeOptionsList.map((themeOption) => {
          const { label, value } = themeOption;
          const Icon = themeIcons[value];
          return (
            <Listbox.Option
              key={value}
              value={themeOption}
              className="flex cursor-pointer items-center justify-between px-5 ui-selected:text-textClr-1 md:h-9"
            >
              <span>{label}</span>
              <Icon className="ml-3 w-5" />
            </Listbox.Option>
          );
        })}
      </Listbox.Options>
    </Listbox>
  );
}
