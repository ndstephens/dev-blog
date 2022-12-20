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
      className="relative -mr-3 font-sans text-base font-medium uppercase text-textClr-base"
    >
      <Listbox.Label className="sr-only">UI Theme:</Listbox.Label>
      <Listbox.Button className="flex h-full place-items-center px-3">
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
              className="flex cursor-pointer justify-between py-1 px-3 ui-selected:text-primaryClr"
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
