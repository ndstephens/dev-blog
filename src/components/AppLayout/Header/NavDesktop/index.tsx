import { useRouter } from 'next/router';
import styled from 'styled-components';

import { ActiveLink } from 'src/components/AppLayout/Header/NavDesktop/ActiveLink';
import { capitalizeFirstLetter } from 'src/utils/helperFns';

export function NavDesktop() {
  const { pathname } = useRouter();

  const sections = ['blog', 'portfolio', 'about'];

  return (
    <NavContainer>
      <NavList>
        {sections.map((section) => (
          <NavItem key={section}>
            <ActiveLink
              name={capitalizeFirstLetter(section)}
              href={`/${section}`}
              isActive={pathname.startsWith(`/${section}`)}
            />
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  );
}

/* =============================================
                STYLED-COMPONENTS
============================================= */
const NavContainer = styled.nav`
  height: 100%;
`;

const NavList = styled.ul`
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  margin-inline: 10px;
  display: flex;
  align-items: center;
`;
