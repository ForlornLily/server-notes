const utils = require('./utils')

module.exports = {
  title: 'server-notes',
  description: '个人后端笔记',
  base: '/server-notes/',
  port: 1001,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  ],
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '后端框架',
        items: [
          { text: 'Express', link: '/express/' },
          { text: 'koa', link: '/koa/' },
        ],
      },
      {
        text: '数据库',
        items: [
          { text: 'SQL', link: '/sql/' },
          { text: 'MySQL', link: '/mysql/' },
          { text: 'MongoDB', link: '/mongodb/' },
          { text: 'Redis', link: '/redis/' },
        ],
      },
    ],
    sidebar: utils.inferSiderbars(),
    lastUpdated: '上次更新',
    repo: 'ForlornLily/server-notes',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    sidebarDepth: 2,
    search: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@public': './public',
      },
    },
  },
  ga: 'UA-109340118-1',
  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-include'))
    },
  },
}
