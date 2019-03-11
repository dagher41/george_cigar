const env = process.env.NODE_ENV || 'development';

const config = {
    operatorsAliases: false,
    console_access: process.env.CONSOLE_ACCESS || false
};

const envConfig = {
    development: {
        username: 'root',
        password: null,
        name: 'george_cigar_development',
        host: '127.0.0.1',
        dialect: 'postgres',
        database: 'george_cigar_development',
        console_access: true
    },
    test: {
        username: 'root',
        password: null,
        name: 'george_cigar_test',
        host: '127.0.0.1',
        dialect: 'postgres',
        database: 'george_cigar_test',
        console_access: true
    },
    production: {
        use_env_variable: 'DATABASE_URL'
    }
};

module.exports = Object.assign(config, envConfig[env]);