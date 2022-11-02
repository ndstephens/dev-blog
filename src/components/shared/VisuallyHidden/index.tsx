import { CSSProperties, ReactNode, useEffect, useState } from 'react';

const hiddenStyles: CSSProperties = {
  display: 'inline-block',
  position: 'absolute',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  height: 1,
  width: 1,
  margin: -1,
  padding: 0,
  border: 0,
};

interface UnknownProps {
  [key: string]: any;
}
interface Props extends UnknownProps {
  children: ReactNode;
}

export default function VisuallyHidden({ children, ...delegated }: Props) {
  const [forceShow, setForceShow] = useState(false);
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Alt') {
          setForceShow(true);
        }
      };
      const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === 'Alt') {
          setForceShow(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, []);

  const style = forceShow ? {} : hiddenStyles;

  // if (forceShow) {
  //   return children;
  // }
  return (
    <span style={style} {...delegated}>
      {children}
    </span>
  );
}
