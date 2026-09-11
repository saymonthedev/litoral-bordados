import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { content } from "@/config/content";
import { navItems, siteConfig } from "@/config/siteConfig";
import { emailHref, instagramHandle, instagramHref, phoneHref, whatsappHref } from "@/lib/contact";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";

/**
 * Rodapé: a "bainha" da página — a borda superior é uma onda com o
 * pesponto correndo por dentro, como o acabamento de um tecido.
 */
export function Footer() {
  const ano = new Date().getFullYear();
  const whats = whatsappHref();
  const insta = instagramHref();
  const email = emailHref();
  const fone = phoneHref();
  const endereco = siteConfig.address.trim();

  return (
    <footer className="relative mt-24 text-linho">
      {/* bainha em onda */}
      <div aria-hidden="true" className="relative -mb-px block">
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="block h-16 w-full md:h-24" fill="none">
          <path
            d="M0 110V44c150-34 300 26 470 20s280-52 470-40 350 52 500 22v64Z"
            fill="#0E2C42"
          />
          <path
            d="M0 66c150-34 300 26 470 20s280-52 470-40 350 52 500 22"
            stroke="#E07A55"
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeDasharray="12 9"
            transform="translate(0 14)"
          />
        </svg>
      </div>

      <div className="textura-linho-clara bg-mare">
        <div className="mx-auto max-w-[78rem] px-5 pb-10 pt-14 sm:px-8 md:pt-16">
          <div className="grid gap-12 md:grid-cols-12">
            {/* marca */}
            <div className="md:col-span-5">
              <Image
                src={siteConfig.logoLight}
                alt={siteConfig.name}
                width={269}
                height={72}
                className="h-11 w-auto"
              />
              <p className="mt-6 max-w-sm text-[0.97rem] leading-relaxed text-linho/65">
                {content.footer.description}
              </p>
              <p className="mt-5 font-display text-lg italic text-linho/80">{siteConfig.tagline}</p>

              {(whats || insta) && (
                <div className="mt-7 flex items-center gap-3">
                  {whats ? (
                    <a
                      href={whats}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Falar no WhatsApp"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-linho/20 text-linho/80 transition-colors duration-300 hover:border-coral-claro/60 hover:text-coral-claro"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                    </a>
                  ) : null}
                  {insta ? (
                    <a
                      href={insta}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram da Litoral Bordados"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-linho/20 text-linho/80 transition-colors duration-300 hover:border-coral-claro/60 hover:text-coral-claro"
                    >
                      <InstagramIcon className="h-5 w-5" />
                    </a>
                  ) : null}
                </div>
              )}
            </div>

            {/* navegação */}
            <nav aria-label="Navegação do rodapé" className="md:col-span-3">
              <h2 className="text-[0.72rem] font-semibold tracking-[0.24em] text-coral-claro uppercase">
                {content.footer.navTitle}
              </h2>
              <ul className="mt-5 space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-[0.97rem] text-linho/70 transition-colors duration-300 hover:text-linho"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-0 border-t-[1.5px] border-dashed border-coral-claro transition-all duration-500 ease-linha group-hover:w-5"
                      />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* contato */}
            <div className="md:col-span-4">
              <h2 className="text-[0.72rem] font-semibold tracking-[0.24em] text-coral-claro uppercase">
                {content.footer.contactTitle}
              </h2>

              {whats || email || fone || endereco || insta ? (
                <ul className="mt-5 space-y-4 text-[0.97rem] text-linho/70">
                  {whats ? (
                    <li>
                      <a
                        href={whats}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 transition-colors hover:text-linho"
                      >
                        <WhatsAppIcon className="h-4.5 w-4.5 shrink-0 text-coral-claro" />
                        WhatsApp
                      </a>
                    </li>
                  ) : null}
                  {fone ? (
                    <li>
                      <a href={fone} className="inline-flex items-center gap-3 transition-colors hover:text-linho">
                        <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-coral-claro" />
                        {siteConfig.phone}
                      </a>
                    </li>
                  ) : null}
                  {email ? (
                    <li>
                      <a href={email} className="inline-flex items-center gap-3 transition-colors hover:text-linho">
                        <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-coral-claro" />
                        {siteConfig.email}
                      </a>
                    </li>
                  ) : null}
                  {insta ? (
                    <li>
                      <a
                        href={insta}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 transition-colors hover:text-linho"
                      >
                        <InstagramIcon className="h-4 w-4 shrink-0 text-coral-claro" />@{instagramHandle()}
                      </a>
                    </li>
                  ) : null}
                  {endereco ? (
                    <li className="flex items-start gap-3">
                      <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-coral-claro" />
                      <span>{endereco}</span>
                    </li>
                  ) : null}
                  {siteConfig.openingHours.trim() ? (
                    <li className="pl-7 text-linho/50">{siteConfig.openingHours}</li>
                  ) : null}
                </ul>
              ) : (
                <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-linho/55">
                  Os canais de atendimento serão divulgados em breve.
                </p>
              )}
            </div>
          </div>

          {/* rodapé do rodapé */}
          <div className="mt-14 flex flex-col gap-4 border-t border-dashed border-linho/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.83rem] text-linho/50">
              © {ano} {siteConfig.name}. {content.footer.rights}
            </p>
            <a
              href="#inicio"
              className="group inline-flex items-center gap-2 self-start text-[0.83rem] text-linho/55 transition-colors hover:text-linho sm:self-auto"
            >
              <span
                aria-hidden="true"
                className="h-px w-6 border-t-[1.5px] border-dashed border-linho/40 transition-all duration-500 ease-linha group-hover:w-10"
              />
              {content.footer.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
