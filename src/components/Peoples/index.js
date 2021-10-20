import { StaticImage } from "gatsby-plugin-image";
import React from "react";


export default function PeoplesBecapital() {

  return(
    <section className="section section__peoples">
      <div className="section__container">
        <h2 className="section__title">BeCapitals por eles</h2>
        <div className="peoples__grid">
          <article className="peoples__card--primary">
            <StaticImage src="../../images/foto_renata_mattos_full_2x.jpg" alt="Foto de Renata Mattos, Coordenadora de Conteúdo" className="peoples__image--card-primary"/>
            <div className="peoples__description">
              <StaticImage src="../../images/open-quote.png" alt="Ícone de citação" className="icon-quote"/>
              <p className="peoples__paragraph">Quem acredita no trabalho como a soma de ações concretizadas tem um terreno fértil na BeCapital para se realizar. Aqui, temos autonomia para propor, criar e avançar com as mais improváveis ideias. </p>
              <p className="peoples__paragraph">Vivemos em um ambiente coerente de discurso e prática, conectando a essência da empresa com o ofício diário de se desafiar como pessoas e profissionais.</p>
              <p className="peoples__paragraph">Ser BeCapital é ser você em sua melhor potência.</p>

              <h3 className="peoples__name"><strong>Renata Mattos</strong> | Coordenadora de Conteúdo</h3>
            </div>
          </article>
          <div className="peoples__grid--block">
          <article className="peoples__card--secondary">
            <div className="peoples__description">
              <StaticImage src="../../images/open-quote.png" alt="Ícone de citação" className="icon-quote"/>
              <p className="peoples__paragraph">Aqui na BeCapital, sou acolhida desde o primeiro dia. A estrutura de feedback e o plano de desenvolvimento pessoal estão contribuindo para que eu possa enxergar minhas potencialidades e fraquezas em um processo rico de autoconhecimento.</p>
            </div>
            <div className="peoples__author">
              <StaticImage src="../../images/foto_mylena_santos_2x.png" alt="Foto de Mylena Santos, Analista Financeiro" className="peoples__image--card-primary"/>
              <h3 className="peoples__name"><strong>Mylena Santos</strong><br/> Analista Financeiro</h3>
            </div>
          </article>
          <article className="peoples__card--secondary">
            <div className="peoples__description">
              <StaticImage src="../../images/open-quote.png" alt="Ícone de citação" className="icon-quote"/>
              <p className="peoples__paragraph">O modelo de gestão de pessoas que criamos na BeCapital é muito inspirador! Temos uma cultura que conecta as pessoas com uma gestão horizontal e totalmente colaborativa. </p>
              <p className="peoples__paragraph">O desenvolvimento pessoal e profissional de cada BeCapital é uma prioridade para nós, por isso, criamos um plano de desenvolvimento individual que busca estabelecer uma conexão entre a performance e os soft skills fazendo com que cada um saiba exatamente onde está e onde pode e deve chegar dentro da empresa.</p>
              <p className="peoples__paragraph">Tudo acontece da forma mais transparente possível.</p>
              <p className="peoples__paragraph">Aqui, você é protagonista da sua carreira em todos os sentidos!</p>
            </div>
            <div className="peoples__author">
              <StaticImage src="../../images/foto_gabriella_alves_2x.png" alt="Foto de Gabriella Alves, Analista de Recursos Humanos" className="peoples__image--card-primary"/>
              <h3 className="peoples__name"><strong>Gabriella Alves</strong><br/> Analista de Recursos Humanos</h3>
            </div>
          </article>
          </div>
        </div>
      </div>
    </section>
  )
}

