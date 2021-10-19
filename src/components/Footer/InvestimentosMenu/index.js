import React from "react";
import { StaticQuery, graphql, Link } from "gatsby"

const SubMenu = () => (
   <StaticQuery
   query={graphql`
     query {
      allWpServico(sort: {fields: date, order: DESC}) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
     }
   `}
   render={data => (
    <ul className="footer__menu">
      <li className="menu__item">
        <a href="https://maquinadossonhos.be.capital/" className="menu__link">Planejamento Financeiro</a>
      </li>
      {data.allWpServico.edges.map((page) => (
        <li className="menu__item" key={page.node.id}>
          <Link to={`/${page.node.slug}`} className="menu__link">{page.node.title}</Link>
        </li>
      ))}
    </ul>
   )}
 />
)

export default SubMenu;