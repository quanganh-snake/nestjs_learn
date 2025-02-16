import { User } from "src/entities/user.entity";
import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from 'typeorm'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().createMany(10)
  }
}