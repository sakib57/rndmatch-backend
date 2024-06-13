module.exports = {
  apps: [
    {
      name: 'rndmatch-api',
      script: 'npm run start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    stage: {
      user: 'softify',
      host: '167.172.56.92',
      ref: 'main',
      repo: 'git@gitlab.com:roomey_rahman/rndmatch-backend.git',
      ssh_options: 'StrictHostKeyChecking=no',
      path: '/home/softify/rndmatch-prod/rndmatch-backend',
      'post-deploy':
        'git pull && npm install && npm run build && pm2 startOrGracefulReload pm2-ecosystem.config.js --env production && pm2 save',
    },
  },
};
