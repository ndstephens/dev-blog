import styled from 'styled-components';

import { MaxWidthWrapper } from 'src/components/shared';

interface MainProps {
  children: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <MainContainer>
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </MainContainer>
  );
}

/* =============================================
                STYLED-COMPONENTS
============================================= */
const MainContainer = styled.main`
  width: 100%;
  position: relative;
  z-index: 5;
`;
