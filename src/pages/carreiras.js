import React from "react";
import Layout from "../components/layout";
import { StaticImage} from "gatsby-plugin-image";
import AdvantageClub from "../components/Advantage";
import PeoplesBecapital from "../components/Peoples";
import SlidesValuesBecapital from "../components/Slides/SlidesValues";
import WordsEffect from "../components/WordsEffect";
import Seo from "../components/seo";

const Carreiras = () => {

  return(
    <Layout>
      <Seo
        title="Carreiras |"
        description="Uma nova maneira de pensar e agir no mercado de capitais. Acreditamos que investir é para todos."
      />
      <section className="banner banner__secondary banner--carreiras">
        <div className="banner__content">
          <div className="banner__text">
            <h2 className="section__title">Ser BeCapital é <br/> <WordsEffect /></h2>
            <p className="section__subtitle">Conheça o Jeito <strong>Be</strong> de trabalhar, viver e compartilhar</p>
          </div>
          <StaticImage src="../images/banner_carreiras_4x_v2.png" alt="Banner Somos BeCapital" className="banner__figure" imgClassName="banner__image" objectFit="contain" loading="eager" />
        </div>
      </section>
      <section className="section section__values">
        <div className="section__container">
          <ul className="values__items">
            <li className="values__item">
              <article className="values__article">
                <StaticImage src="../images/imagem_dos_diretores_card_de_visao_4x.jpg" alt="Imagem dos diretores da becapital, card de visão da empresa" className="values__figure" imgClassName="values_image"/>
                <div className="values__description">
                  <h2 className="values__title">Visão</h2>
                  <hr/>
                  <p className="values__text">Colocar a Asset listada entre as <strong>10 maiores da América Latina</strong></p>
                  <p className="values__text">Criar um banco digital até <strong>2022</strong></p>
                  <p className="values__text">Lançar nosso IPO na <strong>bolsa de Nova Iorque</strong> até 2030</p>
                </div>
              </article>
            </li>
            <li className="values__item">
              <article className="values__article">
                <StaticImage src="../images/imagem_de_alvo_card_missao_4x.jpg" alt="Imagem dos diretores da becapital, card de visão da empresa" className="values__figure" imgClassName="values_image"/>
                <div className="values__description">
                  <h2 className="values__title">Missão</h2>
                  <hr/>
                  <p className="values__text">O que a BeCapital impacta na vida de todas as pessoas que são e fazem parte dela? </p>
                  <p className="values__text">“Ser algo maior que uma empresa é te enxergar como algo maior que um cliente.”</p>
                </div>
              </article>
            </li>
          </ul>
          <div className="values__terms">
            <svg width="41" height="594" viewBox="0 0 41 594" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 594V422.074L38 365.244L3 306.327V0" stroke="#EA5E45" stroke-width="5" stroke-miterlimit="10"/></svg>
              <div className="values__terms-text">
                <h2 className="terms__title">Temos personalidade!</h2>
                <p className="terms__text">Você acha que já viu todo tipo de empresa do mercado financeiro?</p>
                <p className="terms__text">A partir de agora, você vai conhecer o que há de diferente na gestão de investimentos e planejamento financeiro.</p>
              </div>
          </div>
          <div className="terms__video">
            <iframe width="1206" height="678" src="https://www.youtube.com/embed/a5ApMPYlENI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p className="terms__subtitle"><a href="https://www.youtube.com/watch?v=qM4zknWm2wQ" target="_blank" rel="noopener noreferrer">clique aqui</a> e veja o making of</p>
          </div>
        </div>
      </section>
      <SlidesValuesBecapital />
      <section className="section section__career">
        <h2 className="section__title">Entre para o time</h2>
        <div className="section__container">
          <div className="career__items">
            <div className="career__item">
              <a href="https://linktr.ee/rhbe" className="career__button" target="_blank" rel="noopener noreferrer">
                <StaticImage src="../images/job-choose-cadidate.png" alt="Botão Carreiras na BeCapital" />
                <h3 className="career__title">Carreiras na BeCapital</h3>
              </a>
              <p className="career__text">confira as vagas disponíveis hoje</p>
            </div>
            <div className="career__item">
              <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=Y6n2Qln7RUaT8Hnrpa__QzyS7CobnhNJlt7veeNqQ9NURVZIQUtDM1FVUk0zNjVNQ1ZLSE1QN0NQTS4u" className="career__button" target="_blank" rel="noopener noreferrer">
                <StaticImage src="../images/task-checklist-write.png" alt="Botão como fazer parte do time BeCapital" />
                <h3 className="career__title">Como fazer parte?</h3>
              </a>
              <p className="career__text">caso não tenha a vaga pra você, deixe seu currículo aqui</p>
            </div>
          </div>
        </div>
      </section>
      <AdvantageClub/>
      <PeoplesBecapital />
    </Layout>
  )
}

export default Carreiras;