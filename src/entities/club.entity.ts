import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'cm', name: 'clubs' })
export default class ClubsEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'club_id' })
  club_id: string;

  @Column({
    name: 'club_name',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  club_name: string;

  @Column({
    name: 'classification',
    type: 'varchar',
    length: '5',
    nullable: false,
  })
  classification: string;

  @Column({
    name: 'club_poster',
    type: 'longtext',
    nullable: true,
  })
  club_poster: string;

  @Column({
    name: 'club_master',
    type: 'varchar',
    length: 8,
    nullable: false,
  })
  club_master: string;

  @Column({
    name: 'teacher',
    type: 'varchar',
    length: 8,
    nullable: false,
  })
  teacher: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  description: string;

  @Column({
    name: 'st_date',
    type: 'timestamp',
    nullable: true,
  })
  st_date: Date | string | null;

  @Column({
    name: 'end_date',
    type: 'timestamp',
    nullable: true,
  })
  end_date: Date | string | null;
}
