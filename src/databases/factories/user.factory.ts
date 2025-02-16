
import { User } from "src/entities/user.entity";
import { define } from "typeorm-seeding";
import * as Faker from 'faker';


define(User, (faker: typeof Faker) => {

  // Faker Render Data
  const user = new User();
  user.fullname = `${faker.person}`;
  user.email = `${faker.internet.email()}`;
  user.username = `${faker.internet.userName()}`;
  user.password = `${faker.internet.password()}`;
  user.status = faker.random.boolean();
  user.verify_at = new Date()

  return user;
})