import styled from 'styled-components';

import { Logo } from 'src/components/AppLayout/Header/Logo';
import { NavDesktop } from 'src/components/NavDesktop';
import { MaxWidthWrapper } from 'src/components/shared';

export function Header() {
  return (
    <Container>
      <MaxWidthWrapper>
        <HeaderWrapper>
          <Logo />
          <NavDesktop />
        </HeaderWrapper>
      </MaxWidthWrapper>
    </Container>
  );
}

/* =============================================
                STYLED-COMPONENTS
============================================= */
const Container = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  height: 64px;
  min-height: 64px;
  z-index: 10;
`;

const HeaderWrapper = styled.header`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: baseline;
`;
