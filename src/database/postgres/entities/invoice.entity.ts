import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

import { ClientEntity } from './client.entity';

@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  quoteNumber: string;

  @Column('jsonb', { nullable: true })
  lineItems: object[];

  @Column({ nullable: true })
  issuedAt?: Date;

  @Column('jsonb', { nullable: true })
  customerData?: object;

  @ManyToOne(() => ClientEntity, (client) => client.invoices, {
    nullable: false,
  })
  client: ClientEntity;
}

export class LineItems {
  @IsString()
  description: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  amount: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  price: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  units: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  vat: number;
}
