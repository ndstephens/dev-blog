import { useRouter } from 'next/router';
import styled from 'styled-components';

import { ActiveLink } from 'src/components/NavDesktop/ActiveLink';
import { categories } from 'src/postsApi/postConfig';
import { capitalizeFirstLetter } from 'src/utils/helperFns';

export function NavDesktop() {
  // TODO: can probably remove this once i use 'getInitialProps' in the '_app' file since it can pass along 'pathname'
  const { pathname } = useRouter();

  return (
    <NavWrapper>
      <NavList>
        {categories.map((category) => (
          <NavItem key={category}>
            <ActiveLink
              name={capitalizeFirstLetter(category)}
              href={`/category/${category}`}
              path={pathname}
            />
          </NavItem>
        ))}
      </NavList>
    </NavWrapper>
  );
}

/* =============================================
                STYLED-COMPONENTS
============================================= */
const NavWrapper = styled.nav`
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
