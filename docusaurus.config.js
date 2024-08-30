// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';


const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  // metata //
  title: 'QRL Docs',
  tagline: 'Documentation for The Quantum Resistant Ledger - The QRL',
  favicon: 'assets/favicon.svg',
  url: 'https://docs.theqrl.org',
  baseUrl: '/',
  organizationName: 'theQRL', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',


  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

/*
  markdown: {
      mermaid: true,
    },
  themes: ['@docusaurus/theme-mermaid'],
*/

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({

        debug: true, // This will enable the plugin in production  

        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // Serve the docs at the site's root
          editUrl: 'https://github.com/theqrl.org/documentation',
//          remarkPlugins: [math],
//          rehypePlugins: [katex],
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },

        /* // blog stuff
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
          */
        
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

/*// ----- Need to work through
  plugins: [
    [require.resolve('@cmfcmf/docusaurus-search-local'), {
      // whether to index docs pages
      indexDocs: true,
      indexDocSidebarParentCategories: 4,
      indexBlog: false,
      indexPages: false,
      language: "en",
      style: undefined,
      lunr: {
        tokenizerSeparator: /[\s\-]+/
      }
    }],
     
  ],
*/
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
//      image: 'img/docusaurus-social-card.jpg',

      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         */
        playgroundPosition: 'bottom',
      },

      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: '',
        hideOnScroll: true,    
        logo: {
          alt: 'The QRL Logo',
          src: 'assets/img/icons/qrl-logo.svg',
        },
        items: [
        /*// Left Side */
          {
            type: 'dropdown',
            label: 'Use',
            position: 'left',
            items: [
              {
                label: 'Use QRL',
                href: '/use'
              },
              {
                label: 'Wallet',
                href: '/use/wallet'
              },
              {
                label: 'Mining',
                href: '/use/mining'
              },
              {
                label: 'Node',
                href: '/use/node'
              },
              {
                label: 'Tools',
                href: '/use/tools'
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Build',
            position: 'left',
            items: [
              {
                label: 'Build On QRL',
                href: '/build'
              },
              {
                label: 'QRL Core Library',
                href: '/build/qrllib'
              },
              {
                label: 'Address Scheme',
                href: '/build/addresses'
              },
              {
                label: 'QRL Security',
                href: '/build/security'
              },

              {
                label: 'Node CLI',
                href: '/use/node/node-cli/overview'
              },
              {
                label: 'QRL Helpers',
                href: '/build/helpers'
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'API',
            position: 'left',
            items: [
              {
                label: 'QRL API',
                href: '/api'
              },
              {
                label: 'API Overview',
                href: '/api/qrl-api-overview'
              },
              {
                label: 'Public API',
                href: '/api/qrl-public-api'
              },
              {
                label: 'Wallet API',
                href: '/api/wallet-api'
              },
              {
                label: 'Explorer API',
                href: '/api/explorer-api'
              },
              {
                label: 'WalletD Rest Proxy',
                href: '/api/walletd-rest-proxy'
              },
              {
                label: 'Zeus Proxy',
                href: '/api/zeus-proxy'
              },
            ],
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'tutorialSidebar',
            label: 'Tutorials',
          },

        // Right Side

          {
            type: 'dropdown',
            label: 'QRL Network',
            position: 'right',
            items: [
              {
                label: 'Main Site',
                href: 'https://theqrl.org',
              },
              {
                label: 'Explorer',
                href: 'https://explorer.theqrl.org',
              },
              {
                label: 'QRL Wallet',
                href: 'https://wallet.theqrl.org',
              },
              {
                label: 'Status',
                href: 'https://status.theqrl.org',
              },
            ],
          },
          {
            href: 'https://github.com/theQRL/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },




      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'User Documentation',
                to: '/use',
              },
              {
                label: 'Developer Documentation',
                to: '/build',
              },
              {
                label: 'API Documentation',
                to: '/api',
              },
              {
                label: 'Tutorials and Guides',
                to: '/tutorials/overview',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://www.theqrl.org/discord',
              },
              {
                label: 'Telegram',
                href: 'https://www.theqrl.org/telegram',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/QRLedger',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/theQRL/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} The QRL - Built with Docusaurus.`,
      },
/*      prism: {
        theme: require('prism-react-renderer/themes/github'),
        darkTheme: require('prism-react-renderer/themes/dracula'),
      },
*/      
    }),
};

export default config;
