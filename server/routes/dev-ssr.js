const Router = require('koa-router')
const webpack = require('webpack')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFileSystem = require('memory-fs')
const VueServerRenderer = require('vue-server-renderer')
const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server-render')

const serverCompiler = webpack(serverConfig)

const mfs = new MemoryFileSystem
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))

  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = 'waiting...'
    return
  }

  const clientManifestResp = await axios.get(
    'http://localhost:8000/dist/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('/', handleSSR)

module.exports = router
