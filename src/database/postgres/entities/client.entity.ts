import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { InvoiceEntity } from './invoice.entity';

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.client)
  invoices: InvoiceEntity[];
}
