import { registerAs } from '@nestjs/config';

import { version } from '../../../package.json';

export default registerAs('swagger', () => ({
  title: 'HubGame',
  description: 'Personal Website for games choices (hub)',
  version,
}));
