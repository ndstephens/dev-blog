import { Listbox } from '@headlessui/react';

import useTheme, { themeOptionsList } from 'src/utils/hooks/useTheme';

export default function ThemeSelect() {
  const [selectedTheme, setSelectedTheme] = useTheme();

  if (!selectedTheme) {
    return null;
  }

  const SelectedIcon = selectedTheme.icon;

  // TODO: finish creating UI

  return (
    <Listbox value={selectedTheme} onChange={setSelectedTheme}>
      <Listbox.Button>{selectedTheme.label}</Listbox.Button>
      <Listbox.Options>
        {themeOptionsList.map((themeOption) => {
          const { label, value, icon: Icon } = themeOption;
          return (
            <Listbox.Option key={value} value={themeOption}>
              {label}
            </Listbox.Option>
          );
        })}
      </Listbox.Options>
    </Listbox>
  );
}
