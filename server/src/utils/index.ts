import { parse } from 'yaml';
import * as path from 'path';
import * as fs from 'fs';

export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

export const getConfig = () => {
  const env = getEnv();
  const yamlPath = path.join(process.cwd(), `./.config/.${env}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  return config;
};
