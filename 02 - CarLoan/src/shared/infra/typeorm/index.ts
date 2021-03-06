import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// Por causa de um conflito que o docker tem com o typeorm, passa um host padrão com o nome dado ao service do banco de dados.
export default async(host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database: 
        process.env.NODE_ENV === 'test' 
        ? "carloan_test" 
        : defaultOptions.database
    })
  )
}