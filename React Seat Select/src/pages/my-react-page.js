import React from "react";
import { TheaterSeatSelect } from "../../../src/components/TheaterSeatSelect/TheaterSeatSelect";
import Layout from "@theme/Layout";

const config = [
  {
    title: "Main Hall",
    seats: {
      A: [
        { id: "A1", label: "A1" },
        { id: "A2", label: "A2" },
        { id: "A3", label: "A3" },
      ],
      B: [
        { id: "B1", label: "B1" },
        { id: "B2", label: "B2" },
        { id: "B3", label: "B3" },
      ],
    },
  },
];

export default function App() {
  return (
    <Layout >
      <div style={{ display: "flex",flexDirection:"row" }}>
      <aside class="theme-doc-sidebar-container docSidebarContainer_YfHR"><div class="sidebarViewport_aRkj"><div class="sidebar_njMd"><nav aria-label="Docs sidebar" class="menu thin-scrollbar menu_SIkG"><ul class="theme-doc-sidebar-menu menu__list"><li class="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__list-item"><a class="menu__link menu__link--active" aria-current="page" href="/docs/intro">Tutorial Intro</a></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist" href="/docs/category/theater-seat-select">Theater Seat Select</a><button aria-label="Expand sidebar category 'Theater Seat Select'" aria-expanded="false" type="button" class="clean-btn menu__caret"></button></div></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist" href="/docs/category/theater-layout-designer">Theater Layout Designer</a><button aria-label="Expand sidebar category 'Theater Layout Designer'" aria-expanded="false" type="button" class="clean-btn menu__caret"></button></div></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist" href="/docs/category/bus-seat-select">Bus Seat Select</a><button aria-label="Expand sidebar category 'Bus Seat Select'" aria-expanded="false" type="button" class="clean-btn menu__caret"></button></div></li><li class="theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-1 menu__list-item menu__list-item--collapsed"><div class="menu__list-item-collapsible"><a class="menu__link menu__link--sublist" href="/docs/category/bus-layout-designer">Bus Layout Designer</a><button aria-label="Expand sidebar category 'Bus Layout Designer'" aria-expanded="false" type="button" class="clean-btn menu__caret"></button></div></li></ul></nav></div></div></aside>
      <main className="docMainContainer_TBSr" style={{flexDirection:"column"}}>
        <div className="container padding-top--md padding-bottom--lg">
          <div className="row">
            <div className="col docItemCol_VOVn">
              <div className="docItemContainer_Djhp">
                <article>
                  <nav
                    className="theme-doc-breadcrumbs breadcrumbsContainer_Z_bl"
                    aria-label="Breadcrumbs"
                  >
                    <ul className="breadcrumbs">
                      <li className="breadcrumbs__item">
                        <a
                          aria-label="Home page"
                          className="breadcrumbs__link"
                          href="/"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="breadcrumbHomeIcon_YNFT"
                          >
                            <path
                              d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </a>
                      </li>
                      <li className="breadcrumbs__item breadcrumbs__item--active">
                        <span className="breadcrumbs__link">
                          Tutorial Intro
                        </span>
                      </li>
                    </ul>
                  </nav>

                  <div className="tocCollapsible_ETCw theme-doc-toc-mobile tocMobile_ITEo">
                    <button
                      type="button"
                      className="clean-btn tocCollapsibleButton_TO0P"
                    >
                      On this page
                    </button>
                  </div>

                  <div className="theme-doc-markdown markdown">
                    <header>
                      <h1>Tutorial Intro</h1>
                    </header>

                    <p>
                      Welcome to the <strong>React Seat Select</strong> tutorial! 🎉
                    </p>
                    <p>
                      This package provides <strong>seat selection components</strong>{" "}
                      for theaters and buses, along with layout designers to configure
                      your seating arrangements.
                    </p>

                    <h2
                      className="anchor anchorWithStickyNavbar_LWe7"
                      id="components-overview"
                    >
                      Components Overview
                      <a
                        href="#components-overview"
                        className="hash-link"
                        aria-label="Direct link to Components Overview"
                        title="Direct link to Components Overview"
                      >
                        ​
                      </a>
                    </h2>

                    <p>
                      React Seat Select comes with <strong>four main components</strong>:
                    </p>
                    <ul>
                      <li>
                        🎭 <strong>TheaterSeatSelect</strong> – Renders an interactive
                        seat selection grid for theaters/cinemas.
                      </li>
                      <li>
                        🚌 <strong>BusSeatSelect</strong> – Renders seat layouts for buses
                        with seat selection support.
                      </li>
                      <li>
                        🛠 <strong>TheaterLayoutDesigner</strong> – Helps you{" "}
                        <strong>design and generate configurations</strong> for{" "}
                        <code>TheaterSeatSelect</code>.
                      </li>
                      <li>
                        🛠 <strong>BusLayoutDesigner</strong> – Helps you{" "}
                        <strong>design and generate configurations</strong> for{" "}
                        <code>BusSeatSelect</code>.
                      </li>
                    </ul>

                    <p>
                      These layout designers let you visually create seat maps and export
                      JSON configuration, which can then be used by the seat selection
                      components.
                    </p>

                    <hr />

                    <h2
                      className="anchor anchorWithStickyNavbar_LWe7"
                      id="installation"
                    >
                      Installation
                      <a
                        href="#installation"
                        className="hash-link"
                        aria-label="Direct link to Installation"
                        title="Direct link to Installation"
                      >
                        ​
                      </a>
                    </h2>

                    <p>Install the package using npm or yarn:</p>

                    <div
                      className="language-bash codeBlockContainer_Ckt0 theme-code-block"
                      style={{
                        "--prism-color": "#393A34",
                        "--prism-background-color": "#f6f8fa",
                      }}
                    >
                      <div className="codeBlockContent_QJqH">
                        <pre
                          tabIndex="0"
                          className="prism-code language-bash codeBlock_bY9V thin-scrollbar"
                          style={{
                            color: "rgb(57, 58, 52)",
                            backgroundColor: "rgb(246, 248, 250)",
                          }}
                        >
                          <code className="codeBlockLines_e6Vv">
                            npm install react-seat-select <br />
                            # or <br />
                            yarn add react-seat-select
                          </code>
                        </pre>
                        
                        <div className="buttonGroup_M5ko">
                          <button
                            type="button"
                            aria-label="Copy code to clipboard"
                            title="Copy"
                            className="clean-btn"
                          >
                            <span
                              className="copyButtonIcons_IEyt"
                              aria-hidden="true"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                className="copyButtonIcon_TrPX"
                              >
                                <path
                                  fill="currentColor"
                                  d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
                                ></path>
                              </svg>
                              <svg
                                viewBox="0 0 24 24"
                                className="copyButtonSuccessIcon_cVMy"
                              >
                                <path
                                  fill="currentColor"
                                  d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>

                        
                      </div>
                    </div>
                  </div>

                  <TheaterSeatSelect
        config={config}
        bookedSeats={["A1"]}
        reservedSeats={["B2"]}
        onSelect={(seat) => console.log("Selected:", seat)}
        onUnselect={(seat) => console.log("Unselected:", seat)}
        maxSelectedSeats={3}
      />

                  <footer className="theme-doc-footer docusaurus-mt-lg">
                    <div className="row margin-top--sm theme-doc-footer-edit-meta-row">
                      <div className="col">
                        <a
                          href="https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/intro.md"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-edit-this-page"
                        >
                          <svg
                            fill="currentColor"
                            height="20"
                            width="20"
                            viewBox="0 0 40 40"
                            className="iconEdit_Z9Sw"
                            aria-hidden="true"
                          >
                            <g>
                              <path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"></path>
                            </g>
                          </svg>
                          Edit this page
                        </a>
                      </div>
                      <div className="col lastUpdated_JAkA"></div>
                    </div>
                  </footer>
                </article>

                <nav
                  className="docusaurus-mt-lg pagination-nav"
                  aria-label="Docs pages"
                >
                  <a
                    className="pagination-nav__link pagination-nav__link--next"
                    href="/docs/category/theater-seat-select"
                  >
                    <div className="pagination-nav__sublabel">Next</div>
                    <div className="pagination-nav__label">Theater Seat Select</div>
                  </a>
                </nav>
              </div>
            </div>

            <div className="col col--3">
              <div className="tableOfContents_bqdL thin-scrollbar theme-doc-toc-desktop">
                <ul className="table-of-contents table-of-contents__left-border">
                  <li>
                    <a
                      href="#components-overview"
                      className="table-of-contents__link toc-highlight"
                    >
                      Components Overview
                    </a>
                  </li>
                  <li>
                    <a
                      href="#installation"
                      className="table-of-contents__link toc-highlight table-of-contents__link--active"
                    >
                      Installation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

       
      </main>

      
      </div>
    </Layout>
  );
}
