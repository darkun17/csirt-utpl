/**
 * Configuración PM2 — CSIRT UTPL Frontend (Next.js)
 *
 * Uso:
 *   pm2 start ecosystem.config.js          # iniciar
 *   pm2 reload ecosystem.config.js         # recargar sin downtime
 *   pm2 stop csirt-front                   # detener
 *   pm2 save && pm2 startup                # persistir entre reinicios
 *
 * Ruta destino en servidor: /datos/portalesweb/front-utpl/
 */
module.exports = {
  apps: [
    {
      name: 'csirt-front',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/datos/portalesweb/front-utpl',
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
        DRUPAL_BASE_URL: 'http://localhost:8086',
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '512M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/var/log/pm2/csirt-front-error.log',
      out_file: '/var/log/pm2/csirt-front-out.log',
      merge_logs: true,
      restart_delay: 3000,
      max_restarts: 10,
    },
  ],
};
