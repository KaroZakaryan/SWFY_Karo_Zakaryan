import { DataSource } from 'typeorm';

import {
  InvoiceTable1731422100036,
  ClientAndInvoiceMigration1731804174612,
} from '../migrations';
import { ClientEntity, InvoiceEntity } from '../entities';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'swfy',
  entities: [InvoiceEntity, ClientEntity],
  migrations: [
    InvoiceTable1731422100036,
    ClientAndInvoiceMigration1731804174612,
  ],
  synchronize: false,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
