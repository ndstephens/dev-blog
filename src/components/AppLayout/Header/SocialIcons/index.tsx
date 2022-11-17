import GithubIcon from 'src/assets/icons/github.svg';
import LinkedInIcon from 'src/assets/icons/linkedin.svg';

export function SocialIcons() {
  return (
    <div className="ml-4 flex h-full items-center">
      <SocialLink href="https://github.com/ndstephens">
        <span className="sr-only">Nate Stephens on Github</span>
        <GithubIcon aria-hidden />
      </SocialLink>
      <SocialLink href="https://www.linkedin.com/in/ndstephens/">
        <span className="sr-only">Nate Stephens on LinkedIn</span>
        <LinkedInIcon aria-hidden />
      </SocialLink>
    </div>
  );
}

/* =============================================
              SOCIAL LINK
============================================= */
interface SocialLinkProps {
  children: React.ReactNode;
  href: string;
}
function SocialLink({ children, href }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="[&_svg]:max-w-6 p-2 text-textClr-base [&_svg]:w-6"
    >
      {children}
    </a>
  );
}
