import Link from 'next/link';
import styled, { css } from 'styled-components';

interface ActiveLinkProps {
  name: string;
  href: string;
  path: string;
}

export function ActiveLink({ name, href, path }: ActiveLinkProps) {
  return (
    <Link href={href} passHref>
      <StyledLink isActive={href === path}>{name}</StyledLink>
    </Link>
  );
}

/* =============================================
                STYLED-COMPONENTS
============================================= */
interface StyledLinkProps {
  isActive: boolean;
}

const onHoverOrActiveMixin = css`
  color: var(--color-text-body);
  &::after {
    transform: scaleX(1);
  }
`;

const StyledLink = styled.a<StyledLinkProps>`
  position: relative;
  padding: 10px;
  color: var(--color-text-body-dimmed);
  font-weight: var(--fw-bold);
  font-size: 1.1rem;
  font-family: var(--ff-sans-serif);

  &::after {
    bottom: 8px;
    content: '';
    display: block;
    background-color: currentColor;
    height: 3px;
    left: 10px;
    position: absolute;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease-out;
    width: calc(100% - 20px);
  }

  ${(p) =>
    p.isActive
      ? onHoverOrActiveMixin
      : css`
          &:hover {
            ${onHoverOrActiveMixin}
          }
        `}
`;
