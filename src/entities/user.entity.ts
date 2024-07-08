import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'cm', name: 'users' })
export default class UsersEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @Column({
    name: 'user_id',
    type: 'varchar',
    length: 24,
    nullable: false,
    unique: true,
  })
  user_id: string;

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 8,
    nullable: false,
  })
  user_name: string;

  @Column({
    name: 'user_tel',
    type: 'varchar',
    length: 11,
    nullable: false,
    unique: true,
  })
  user_tel: string;

  @Column({
    name: 'user_mail',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  user_mail: string;

  @Column({
    name: 'user_birth',
    type: 'timestamp',
    nullable: false,
  })
  user_birth: Date | string;

  @Column({
    name: 'user_pw',
    type: 'varchar',
    length: 30,
    nullable: false,
    unique: true,
  })
  user_pw: string;

  @Column({
    name: 'major',
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  major: string;
}
