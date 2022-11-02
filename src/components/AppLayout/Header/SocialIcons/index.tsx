import GithubIcon from 'src/assets/icons/github.svg';
import LinkedInIcon from 'src/assets/icons/linkedin.svg';
import { VisuallyHidden } from 'src/components/shared';

import { container, link } from './SocialIcons.module.scss';

export function SocialIcons() {
  return (
    <div className={container}>
      <a
        href="https://github.com/ndstephens"
        target="_blank"
        rel="noreferrer"
        className={link}
      >
        <GithubIcon />
        <VisuallyHidden>Link to my Github page</VisuallyHidden>
      </a>
      <a
        href="https://www.linkedin.com/in/ndstephens/"
        target="_blank"
        rel="noreferrer"
        className={link}
      >
        <LinkedInIcon />
        <VisuallyHidden>Link to my Linked In page</VisuallyHidden>
      </a>
    </div>
  );
}
