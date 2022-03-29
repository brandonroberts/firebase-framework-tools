import { DeployConfig, PathFactory } from '../utils';
import { existsSync } from 'fs';

const dynamicImport = (getProjectPath: PathFactory) => {
    const exists = (...files: string[]) => files.some(file => existsSync(getProjectPath(file)));
    if (exists('next.config.js')) return import('./next.js/index.js');
    if (exists('nuxt.config.js', 'nuxt.config.ts')) return import('./nuxt/index.js');
    // if (exists('angular.json')) return import('./angular/index.js');
    return import('./express/index.js');
};

export const build = async (config: DeployConfig | Required<DeployConfig>, dev: boolean, getProjectPath: PathFactory) => {
    const command = await dynamicImport(getProjectPath);
    return command.build(config, dev, getProjectPath);
};