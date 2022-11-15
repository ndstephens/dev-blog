import GithubIcon from 'src/assets/icons/github.svg';
import LinkedInIcon from 'src/assets/icons/linkedin.svg';

export function SocialIcons() {
  return (
    <div className="ml-auto flex h-full items-center">
      <SocialLink href="https://github.com/ndstephens">
        <GithubIcon />
      </SocialLink>
      <SocialLink href="https://www.linkedin.com/in/ndstephens/">
        <LinkedInIcon />
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
      className="[&_svg]:max-w-6 p-2 text-text-base [&_svg]:w-6"
    >
      {children}
    </a>
  );
}
