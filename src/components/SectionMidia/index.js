import React from "react";
import { StaticImage } from "gatsby-plugin-image";

export default function SectionMidia() {
  
  return(
    <section className="section section__midia">
      <h2 className="section__title">Na mídia</h2>
      <div className="section__container">
        <ul className="logos__items">
          <li className="logos__item">
            <a href="https://forbes.com.br/forbes-money/2021/07/ipos-impulsionam-flippers-conheca-estrategias-e-riscos-da-pratica/" target="_blank" rel="noopener noreferrer">
              <StaticImage src="../../images/logo_forbes_1x.png" alt="Logo Forbes" />
            </a>
          </li>
          <li className="logos__item">
            <a href="https://virtz.r7.com/criancas-com-deficiencia-ganham-festa-do-hamburguer-em-ong-08062021" target="_blank" rel="noopener noreferrer">
              <StaticImage src="../../images/logo_r7_1x.png" alt="Logo portal R7" />
            </a>
          </li>
          <li className="logos__item">
            <a href="https://economia.estadao.com.br/noticias/geral,o-dilema-do-mundo-imobiliario,70003817015" target="_blank" rel="noopener noreferrer">
              <StaticImage src="../../images/logo_estadao_1x.png" alt="Logo Estadão" />
            </a>
          </li>
          <li className="logos__item">
            <a href="http://revistapress.com.br/advertising/becapital-lanca-campanha-digital-que-incentiva-as-pessoas-a-realizarem-seus-sonhos/" target="_blank" rel="noopener noreferrer">
              <StaticImage src="../../images/logo_press_1x.png" alt="Logo revista press" />
            </a>
          </li>

          <li className="logos__item">
            <a href="https://www.abcdacomunicacao.com.br/becapital-lanca-campanha-digital-que-incentiva-as-pessoas-a-realizarem-seus-sonhos/" target="_blank" rel="noopener noreferrer">
              <StaticImage src="../../images/logo_abc_1x.png" alt="Logo ABC da Comunicação" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}