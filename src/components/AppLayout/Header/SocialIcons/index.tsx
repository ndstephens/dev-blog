import GithubIcon from 'src/assets/icons/github.svg';
import LinkedInIcon from 'src/assets/icons/linkedin.svg';

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
      </a>
      <a
        href="https://www.linkedin.com/in/ndstephens/"
        target="_blank"
        rel="noreferrer"
        className={link}
      >
        <LinkedInIcon />
      </a>
    </div>
  );
}
