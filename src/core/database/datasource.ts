import { DataSource, DataSourceOptions } from 'typeorm';

import { datasource as dataSourceConfig } from '../configuration/database.config';

export default new DataSource(dataSourceConfig as DataSourceOptions);
