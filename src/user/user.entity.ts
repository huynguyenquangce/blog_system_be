import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  firstName: string;

  @Column({
    nullable: false,
  })
  lastName: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
    default: new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
    }),
  })
  updatedAt: string;

  @Column({
    nullable: false,
    default: new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
    }),
  })
  createAt: string;

  @Column({
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    length: 50,
    default: 'Normal',
  })
  accountType: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column({
    default: null,
  })
  deleteAt: string;

  @Column({
    type: 'text',
  })
  imageURL: string;

  @Column({
    default: 'user',
  })
  role: string;
}
