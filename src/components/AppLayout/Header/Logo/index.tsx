import Link from 'next/link';
import styled from 'styled-components';

export function Logo() {
  return (
    <Link href="/" passHref>
      <LogoLink>
        <LogoWrapper>Nate Stephens</LogoWrapper>
      </LogoLink>
    </Link>
  );
}

/* =============================================
              STYLED-COMPONENTS
============================================= */
const LogoLink = styled.a`
  margin-inline-end: 32px;
`;

const LogoWrapper = styled.span`
  font-family: var(--ff-sans-serif);
  font-weight: var(--fw-bold);
  font-size: 24px;
  color: red;
`;
