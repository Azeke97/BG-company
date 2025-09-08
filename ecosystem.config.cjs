module.exports = {
  apps: [{
    name: 'bg-company',
    script: 'node',
    args: ['--env-file=.env', '.output/server/index.mjs'], // <-- Node сам загрузит .env
    cwd: '/home/deploy/apps/BG-company',                   // стартуем из корня проекта
    env: {
      NODE_ENV: 'production',
      NUXT_HOST: '127.0.0.1',
      NUXT_PORT: '3000'
    },
    autorestart: true,
    max_restarts: 10
  }]
}
