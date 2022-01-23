module.exports = {
  async redirects() {
    return [
      {
        source: '/recipes',
        destination: '/',
        permanent: false,
      },
    ]
  },
}