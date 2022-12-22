import GithubIcon from '@assets/icons/social/github.svg';
import LinkedInIcon from '@assets/icons/social/linkedin.svg';

export function SocialIcons() {
  return (
    <ul className="flex md:ml-4 md:h-full">
      <SocialLink href="https://github.com/ndstephens" title="Github">
        <GithubIcon aria-hidden aria-labelledby="github" />
        <span className="sr-only" id="github">
          Nate Stephens on Github
        </span>
      </SocialLink>
      <SocialLink
        href="https://www.linkedin.com/in/ndstephens/"
        title="LinkedIn"
      >
        <LinkedInIcon aria-hidden aria-labelledby="linkedin" />
        <span className="sr-only" id="linkedin">
          Nate Stephens on LinkedIn
        </span>
      </SocialLink>
    </ul>
  );
}

/* =============================================
              SOCIAL LINK
============================================= */
interface SocialLinkProps {
  children: React.ReactNode;
  href: string;
  title: string;
}
function SocialLink({ children, href, title }: SocialLinkProps) {
  return (
    <li className="flex items-center md:h-full" title={title}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="p-2 text-textClr-1 [&_svg]:w-5"
      >
        {children}
      </a>
    </li>
  );
}
