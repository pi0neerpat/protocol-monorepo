module.exports = (config, { mode }) => {
  if (mode === 'development') {
    // Add dev plugin
  }
  config.devServer.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers':
      'X-Requested-With, content-type, Authorization',
  }
  return config
}
