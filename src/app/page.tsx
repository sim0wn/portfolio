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
    /* main container */
    <main className="flex flex-col place-items-center justify-center gap-4 p-1.5">
      {/* image and social media */}
      <section className="flex flex-col gap-1.5">
        <Image
          alt="Imagem produzida por inteligência artificial. Um esquilo roxo de capuz com um olhar sério e um fundo escuro."
          className="rounded-full border border-neutral-800"
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
      {/* presentation terminal */}
      <section className="max-w-4xl">
        {/* application bar */}
        <header className="bg-neutral-800 py-2 px-4 flex rounded-t-xl select-none">
          <p className="text-center flex-1">Terminal</p>
          <p>x</p>
        </header>
        <section className="bg-neutral-900 p-1.5 rounded-b-sm">
          {/* command line */}
          <header className="inline-flex select-none">
            <p className="text-green-500">root</p>
            <p className="text-yellow-400">@</p>
            <p className="text-blue-600">sim0wn</p>
            <p className="text-purple-600 px-1">~</p>
            <p className="text-red-600">#</p>
            <p className="italic text-neutral-200 px-1">cat ./welcome.txt</p>
          </header>
          {/* pitch text */}
          <section className="*:indent-8">
            <p>
              Olá, amigo! Sou um Técnico em Informática e estudante de Segurança
              da Informação. Comecei a programar aos 11 anos, desenvolvendo{" "}
              <i>plugins</i> para servidores de Minecraft em Java.
            </p>
            <p>
              Desde então, me aprofundei em diversas áreas da computação, com
              foco em Segurança da Informação. Estou em constante aprendizado,
              participando de cursos, eventos e desafios de{" "}
              <i>capture the flag</i>. Recentemente, conquistei a 1ª colocação
              no CTF Hackers do Bem.
            </p>
            <p>
              Possuo experiência como programador <i>web</i> <i>front-end</i> e{" "}
              <i>back-end</i> com Next.js e Elysia, além de desenvolvimento de
              REST API em TypeScript. Tenho experiência prática de mais de 5
              anos com Linux, incluindo a manutenção e administração do sistema
              por linha de comando.
            </p>
            <p>
              Adicionalmente, tenho conhecimento em Python e BASH. Atualmente,
              estou me especializando em Segurança da Informação, com foco em
              testes de intrusão e exploração de vulnerabilidades em aplicações{" "}
              <i>web</i>.
            </p>
            <p>
              Por fim, desenvolvi esse projeto para compartilhar meu
              conhecimento e experiência. Estou ansioso para discutir
              oportunidades e projetos em comum, além de trocar conhecimento.
              Você pode encontrar meus perfis em redes sociais e plataformas de
              CTF logo acima!
            </p>
          </section>
        </section>
      </section>
    </main>
  )
}
