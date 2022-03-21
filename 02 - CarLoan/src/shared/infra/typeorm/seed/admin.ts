import { hash } from "bcrypt"
import {v4 as uuidV4} from "uuid"

import createConnection from '../index';

export async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
      values('${id}', 'admin', 'admin@carloan.com.br', '${password}', true, 'XXXXXX','now()')
    `
  )

  await connection.close;
}

create().then(() => console.log("User admin created"));
