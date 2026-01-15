/**
 * Configuration Manager
 * Handles application settings and configuration
 */

class ConfigManager {
    constructor() {
        this.config = {};
        this.defaults = {
            apiTimeout: 5000,
            maxRetries: 3,
            logLevel: 'info',
            enableCache: true,
            cacheExpiry: 3600000
        };
        this.config = { ...this.defaults };
    }

    /**
     * Load configuration from object
     */
    load(configObj) {
        this.config = { ...this.config, ...configObj };
        return this.config;
    }

    /**
     * Get configuration value
     */
    get(key, defaultValue = null) {
        return this.config[key] !== undefined ? this.config[key] : defaultValue;
    }

    /**
     * Set configuration value
     */
    set(key, value) {
        this.config[key] = value;
        return value;
    }

    /**
     * Get all configuration
     */
    getAll() {
        return { ...this.config };
    }

    /**
     * Reset to defaults
     */
    reset() {
        this.config = { ...this.defaults };
    }

    /**
     * Validate configuration
     */
    validate() {
        const required = ['apiTimeout', 'maxRetries', 'logLevel'];
        for (let key of required) {
            if (!(key in this.config)) {
                console.warn(`Missing required config: ${key}`);
            }
        }
        return true;
    }
}

// Example usage
const config = new ConfigManager();
config.load({
    apiTimeout: 10000,
    debugMode: true
});

console.log('Config:', config.getAll());
console.log('API Timeout:', config.get('apiTimeout'));

module.exports = ConfigManager;
