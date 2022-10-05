import type { ThemeType } from 'src/styles/theme';
import type { CSSProp } from 'styled-components';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

declare module 'react' {
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}
