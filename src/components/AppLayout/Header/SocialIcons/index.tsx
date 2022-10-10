import styled from 'styled-components';

import GithubIcon from 'src/assets/icons/github.svg';
import LinkedInIcon from 'src/assets/icons/linkedin.svg';

export function SocialIcons() {
  return (
    <Container>
      <IconWrapper
        href="https://github.com/ndstephens"
        target="_blank"
        rel="noreferrer"
      >
        <GithubIcon />
      </IconWrapper>
      <IconWrapper
        href="https://www.linkedin.com/in/ndstephens/"
        target="_blank"
        rel="noreferrer"
      >
        <LinkedInIcon />
      </IconWrapper>
    </Container>
  );
}

/* =============================================
                STYLED-COMPONENTS
============================================= */
const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-inline-start: auto;
`;

const IconWrapper = styled.a`
  padding: 10px;
  color: var(--color-text-body);

  svg {
    width: 24px;
    max-width: 24px;
  }
`;
