const env = process.env.NODE_ENV.toUpperCase();

const prefix = `REACT_APP_${env}_`;
const config: any = {};

Object.keys(process.env).forEach((_key) => {    
    if(_key.includes(env)){
        const key = _key.replace(prefix, "");
        config[key] = process.env[_key];
    }    
});

config["NODE_ENV"] = env.toLowerCase();

export default config;