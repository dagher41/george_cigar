const env = process.env.NODE_ENV || 'development';

const config = {
    port: process.env.PORT || 3000,
    secretKeyBase: process.env.SECRET_KEY_BASE,
    secureConnection: true,
    redisUrl: process.env.REDIS_URL
};

const envConfig = {
    development: {
        secureConnection: false
    },
    test: {

    },
    production: {

    }
};

module.exports = Object.assign(config, envConfig[env]);
