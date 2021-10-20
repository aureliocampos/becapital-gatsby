import React from "react";
import { StaticImage } from "gatsby-plugin-image";

export default function CardSupportCause() {
  return(
    <section className="section section__cards-support">
      <div className="section__container">
        <h2 className="section__title">Causas que apoiamos</h2>

        <div className="card-support__items">
          <article className="card-support__item">
            <StaticImage src="../../../images/image_quadro_de_colaboradores_2x.jpg" alt="imagem sobre a plataforma de ensino que forma refugiados e imigrantes da BeCapital" />
            <div className="card-support__description">
              <a href="https://totidiversidade.com.br/" target="_blank" rel="noopener noreferrer">
                <StaticImage src="../../../images/logo_toti.png" alt="Logo Toti" />
              </a>
              <p className="card-support__text">Em nosso quadro de colaboradores, temos profissionais oriundos de uma <strong>plataforma de ensino</strong> que forma <strong>refugiados</strong> e <strong>imigrantes</strong>.</p>
            </div>
          </article>
          <article className="card-support__item">
            <StaticImage src="../../../images/image_pratocinadores_hamburguer_2x.jpg" alt="imagem Patrocinadores do Dia Mundial do Hambúrguer da BeCapital" />
            <div className="card-support__description">
              <a href="https://osdm.org.br/" target="_blank" rel="noopener noreferrer">
                <StaticImage src="../../../images/logo_dona_meca.png" alt="Logo Dona Meca " />
              </a>
              <p className="card-support__text">Patrocinadores do <strong>Dia Mundial do Hambúrguer</strong>: A BeCapital viabilizou a entrega de hambúrgueres na Obra Social Dona Meca, que acolhe <strong>crianças</strong> e <strong>jovens especiais</strong> em vulnerabilidade social.</p>
            </div>
          </article>
        </div>  
      </div>
    </section>
  )
}