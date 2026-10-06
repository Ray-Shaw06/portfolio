import Link from "next/link";
import { profile } from "@/content/profile.ts";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <p className="site-footer-name">Rehaan Shaw<span aria-hidden="true">.</span></p>
        <p>Software engineering &amp; AI engineering<br />UC Irvine CS ’28</p>
      </div>
      <div className="site-footer-bottom">
        <p>Built with the same care I put into the work it shows.</p>
        <nav aria-label="Footer links">
          <Link href="/work/">Work</Link>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={'mailto:' + profile.email}>Email</a>
          <a href={profile.resume} target="_blank" rel="noreferrer">Resume</a>
        </nav>
      </div>
    </footer>
  );
}
