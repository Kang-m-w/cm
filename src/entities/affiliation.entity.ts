import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'cm', name: 'affiliation' })
export default class AffiliationEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'affi_id' })
  affi_id: string;

  @Column({
    name: 'club_id',
    type: 'varchar',
    nullable: false,
    unique: false,
  })
  club_id: string;

  @Column({
    name: 'user_id',
    type: 'varchar',
    nullable: false,
    unique: false,
  })
  user_id: string;
}
