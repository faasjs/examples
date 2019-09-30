import { FuncWarpper } from '@faasjs/test';
import { Sql } from '@faasjs/sql';
import { Http } from '@faasjs/http';

export default async function (name: string): Promise<FuncWarpper> {
  const func = new FuncWarpper(require.resolve(`../${name}.func`) as string);
  await func.mountedHandler({ headers: {} });
  func.sql = func.plugins[0] as Sql;
  func.http = func.plugins[1] as Http;

  await func.sql.query('CREATE TABLE IF NOT EXISTS "users" ("id" integer,"username" varchar UNIQUE,"password" varchar, PRIMARY KEY (id));')
  await func.sql.query('DELETE FROM users');

  return func
}
