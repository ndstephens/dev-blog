import styled from 'styled-components';

import { Logo } from 'src/components/AppLayout/Header/Logo';
import { NavDesktop } from 'src/components/AppLayout/Header/NavDesktop';
import { SocialIcons } from 'src/components/AppLayout/Header/SocialIcons';
import { MaxWidthWrapper } from 'src/components/shared';

export function Header() {
  return (
    <HeaderContainer>
      <MaxWidthWrapper>
        <ContentWrapper>
          <Logo />
          <NavDesktop />
          <SocialIcons />
        </ContentWrapper>
      </MaxWidthWrapper>
    </HeaderContainer>
  );
}

/* =============================================
                STYLED-COMPONENTS
============================================= */
const HeaderContainer = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  height: 64px;
  min-height: 64px;
  z-index: 10;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;
