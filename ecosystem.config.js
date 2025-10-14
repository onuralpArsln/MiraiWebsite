module.exports = {
    apps: [{
        name: 'mirai-website',
        script: 'server.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'production',
            PORT: 3002
        },
        error_file: './logs/err.log',
        out_file: './logs/out.log',
        log_file: './logs/combined.log',
        time: true,
        // PM2 specific configurations for static files
        exec_mode: 'fork',
        node_args: '--max-old-space-size=1024',
        // Ensure proper working directory
        cwd: __dirname,
        // Log static file requests
        log_type: 'json'
    }]
};
