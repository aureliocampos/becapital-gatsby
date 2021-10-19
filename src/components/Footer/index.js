import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import InvestimentosMenu from "./InvestimentosMenu";

const Footer = () => {
  return(
    <>
    <footer className="footer">
      <div className="footer__container">
        <section className="footer__section footer__section--header">
          <div className="footer__section--container">
            <StaticImage src="../../images/logo_becapital_2x.png" alt="logo BeCapital" 
            className="footer__logo"
            />
            <p className="footer__title footer--andress">Av. Rio Branco, 108 | 8º andar - Centro - Rio de Janeiro - RJ</p>
            <a href="mailto:imprensa@be.capital" className="footer__link">imprensa@be.capital</a>
          </div>
        </section>
        <section className="footer__section footer__section--main">
          <div className="footer__section--container">
            <div className="footer__section--column">
              <h3 className="footer__title">Investimentos</h3>
              <InvestimentosMenu />
            </div>
            <div className="footer__section--column">
              <h3 className="footer__title">Conteúdos</h3>
              <ul className="footer__menu">
                <li className="menu__item">
                  <a href="https://www.youtube.com/channel/UCLImIm6777cZiGmjaRuFcwQ?view_as=subscriber" className="menu__link" target="_blank" rel="noopener noreferrer">Canal no Youtube</a>
                </li>
                <li className="menu__item">
                  <a href="https://t.me/becapitalresearch" className="menu__link" target="_blank" rel="noopener noreferrer">Grupo no Telegram</a>
                </li>
                <li className="menu__item">
                  <Link to="/blog/" className="menu__link">Blog</Link>
                </li>
              </ul>
            </div>
            <div className="footer__section--column">
              <h3 className="footer__title">Nossa Empresa</h3>
              <ul className="footer__menu">
                <li className="menu__item">
                  <Link to="/somos-becapital/" className="menu__link">A BeCapital</Link>
                </li>
                <li className="menu__item width200">
                  <a href="https://api.whatsapp.com/send?phone=5521965431886&text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20planejamento%20financeiro.%20O%20que%20devo%20fazer%3F%20Poderia%20me%20ajudar%3F" className="menu__link"> Fale com a Beca - Atendimento da BeCapital </a>
                </li>
                <li className="menu__item">
                  <Link to="/carreiras/" className="menu__link">Página de Carreiras</Link>
                </li>
              </ul>
            </div>
            <div className="footer__section--column">
              <StaticImage src="../../images/qrcode_3x.png" alt="QRCode BeCapital"
              className="qrcode"
            />
              </div>
          </div>
        </section>
        <section className="footer__section footer__section--footer">
          <div className="footer__section--container">
            <div className="footer__section--column">
              <h3 className="footer__title">Siga a BeCapital</h3>
              <ul className="footer__social social__menu">
                <li className="social__item">
                  <a href="https://www.instagram.com/becapital.oficial/" className="social__link"
                  target="_blank" rel="noopener noreferrer">
                  <StaticImage src="../../images/icon_instagram_orange.png" alt="Logo Instagram"/>
                  </a>
                </li>
                <li className="social__item">
                  <a href="https://www.youtube.com/channel/UCLImIm6777cZiGmjaRuFcwQ?view_as=subscriber" className="social__link"
                  target="_blank" rel="noopener noreferrer">
                  <StaticImage src="../../images/icon_youtube_orange.png" alt="Logo Youtube"/>
                  </a>
                </li>
                <li className="social__item">
                  <a href="https://www.linkedin.com/company/71399542/" className="social__link"
                  target="_blank" rel="noopener noreferrer">
                  <StaticImage src="../../images/icon_linkedin_orange.png" alt="Logo Linkedin" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__section--column">
              <h3 className="footer__title">Horário de atendimento</h3>
              <p className="footer__text">Segunda a Sexta de 9h às 18h</p>
            </div>
            <div className="footer__section--column">
              <h3 className="footer__title">Contato para atendimento</h3>
              <p className="footer__text"><a href="tel:+552139939670">(21) 3993 - 9670</a></p>
            </div>
            <div className="footer__section--column">
              <a href="https://www2.susep.gov.br/safe/Corretores/pesquisa" className="social__link"
                target="_blank" rel="noopener noreferrer">
                <StaticImage src="../../images/logo_susep_1x.png" alt="Logo SUSEP" />
              </a>
            </div>
          </div>
        </section>
        <section className="footer__section footer__end">
          <small className="footer__title">BeCapital <strong>®</strong> Todos os direitos reservados - CNPJ: 36.664.223/0001-09</small>
          <small  className="footer__text">A BeCapital Live Corretora de Seguros LTDA  (CNPJ 29.761.563/0001-84) está registrada na Susep com o código 212113018, estando autorizada a comercializar produtos como: micro-seguros, plano de capitalização, seguro de pessoas, plano de previdência complementar e seguro de danos.</small>



        </section>
      </div>
    </footer>
    </>

  )
}

export default Footer;