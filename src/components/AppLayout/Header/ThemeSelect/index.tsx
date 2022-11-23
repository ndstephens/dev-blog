import { Listbox } from '@headlessui/react';

import MoonIcon from 'src/assets/icons/theme/moon.svg';
import OSIcon from 'src/assets/icons/theme/os.svg';
import SunIcon from 'src/assets/icons/theme/sun.svg';
import useTheme, { DARK, LIGHT, SYSTEM } from 'src/utils/hooks/useTheme';

const themeOptions = [
  {
    label: 'System',
    value: SYSTEM,
    icon: OSIcon,
  },
  {
    label: 'Light',
    value: LIGHT,
    icon: SunIcon,
  },
  {
    label: 'Dark',
    value: DARK,
    icon: MoonIcon,
  },
] as const;

export default function ThemeSelect() {
  // TODO: should probably have the whole object in "selectedTheme"
  const [selectedTheme, setSelectedTheme] = useTheme();
  // TODO: redo all this shit
  const theme = themeOptions.find((theme) => theme.value === selectedTheme)!;

  return (
    <Listbox value={selectedTheme} onChange={setSelectedTheme}>
      <Listbox.Button>{theme.label}</Listbox.Button>
      <Listbox.Options>
        {themeOptions.map(({ label, value, icon: Icon }) => (
          <Listbox.Option key={value} value={value}>
            {label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
