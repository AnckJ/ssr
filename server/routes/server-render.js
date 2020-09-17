const ejs = require('ejs')
const webpackConfig = require('../../build/webpack.config.client')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path }

  try {
    const appString = await renderer.renderToString(context)

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      abc: `<script src="${webpackConfig.output.publicPath}resources/src/assets/js/abc.js"></script>`
    })

    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
