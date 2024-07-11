import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'cm', name: 'schedule' })
export default class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'schedule_id' })
  schedule_id: string;

  @Column({
    name: 'schedule_name',
    type: 'varchar',
    nullable: false,
  })
  schedule_name: string;

  @Column({
    name: 'schedule_desc',
    type: 'text',
    nullable: false,
  })
  schedule_desc: string;

  @Column({
    name: 'club_id',
    type: 'varchar',
    nullable: false,
    unique: false,
  })
  club_id: string;

  @Column({
    name: 'schedule_area',
    type: 'varchar',
    nullable: false,
  })
  schedule_area: string;

  @Column({
    name: 'schedule_date',
    type: 'timestamp',
    nullable: false,
  })
  schedule_date: Date | string;
}
