import GithubIcon from 'src/assets/icons/social/github.svg';
import LinkedInIcon from 'src/assets/icons/social/linkedin.svg';

export function SocialIcons() {
  return (
    <ul className="flex md:ml-4 md:h-full">
      <SocialLink href="https://github.com/ndstephens" title="Github">
        <span className="sr-only" id="github">
          Nate Stephens on Github
        </span>
        <GithubIcon aria-hidden aria-labelledby="github" />
      </SocialLink>
      <SocialLink
        href="https://www.linkedin.com/in/ndstephens/"
        title="LinkedIn"
      >
        <span className="sr-only">Nate Stephens on LinkedIn</span>
        <LinkedInIcon aria-hidden />
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
        className="[&_svg]:max-w-5 p-2 text-textClr-base [&_svg]:w-5"
      >
        {children}
      </a>
    </li>
  );
}
