import EmailIcon from "@/icons/email.icon"
import GithubIcon from "@/icons/github.icon"
import HackTheBoxIcon from "@/icons/hackthebox.icon"
import LattesIcon from "@/icons/lattes.icon"
import LinkedInIcon from "@/icons/linkedin.icon"
import TryHackMeIcon from "@/icons/tryhackme.icon"
import Image from "next/image"
import Link from "next/link"

export default function WhoAmI() {
  return (
    <main className="flex flex-col sm:flex-row place-items-center justify-center gap-4 h-screen p-1.5">
      <section className="flex flex-col gap-1.5">
        <Image
          alt=""
          className="rounded-full"
          height={250}
          src={"/images/sim0wn.jpg"}
          width={250}
        />
        <ul className="border-y border-neutral-800 py-2 text-4xl flex gap-1.5 justify-center">
          <li>
            <Link
              href={"https://www.linkedin.com/in/halissoncruz/"}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedInIcon />
            </Link>
          </li>
          <li>
            <Link
              href={"http://lattes.cnpq.br/4781391320784524/"}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LattesIcon />
            </Link>
          </li>
          <li>
            <Link
              href={"https://app.hackthebox.com/profile/143157/"}
              rel="noopener noreferrer"
              target="_blank"
            >
              <HackTheBoxIcon />
            </Link>
          </li>
          <li>
            <Link
              href={"https://github.com/sim0wn/"}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon />
            </Link>
          </li>
          <li>
            <Link
              href={"https://tryhackme.com/p/sim0wn/"}
              rel="noopener noreferrer"
              target="_blank"
            >
              <TryHackMeIcon />
            </Link>
          </li>
          <li>
            <Link
              href={"mailto:contact@sim0wn.com"}
              rel="noopener noreferrer"
              target="_blank"
            >
              <EmailIcon />
            </Link>
          </li>
        </ul>
      </section>
      <section className="max-w-lg">
        <p className="text-wrap text-lg text-center">
          Olá, amigo. Seja bem-vindo! Sou um entusiasta apaixonado por Segurança
          da Informação. Aqui, lhe disponibilizo os links de acesso ao meu
          currículo acadêmico e profissional, além do meu perfil do LinkedIn e
          plataformas de desafios. Em breve, estarei disponibilizando resoluções
          de desafios através dessa plataforma para auxiliar outros estudantes e
          profissionais de Segurança da Informação a resolverem desafios ou
          aprenderem coisas novas.
        </p>
      </section>
    </main>
  )
}
