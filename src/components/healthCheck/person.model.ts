import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Person extends Model<Person> {
  @Column
  public name!: string;

  @Column
  public birthday!: Date;
}
