import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

type Filters = {
  [key: string]: string[];
};

SQLite.enablePromise(true);

export const TABLES = {
  CRYPTOS: `cryptos`,
  FIATS: `fiats`,
};

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  return await SQLite.openDatabase({
    name: `GenericDB.db`,
    location: `default`,
  });
};

export const createTable = async (
  db: SQLiteDatabase,
  tableName: string,
  schema: string
): Promise<void> => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`;

  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(`failed to create`, error);
  }
};

export const dropTable = async (
  db: SQLiteDatabase,
  tableName: string
): Promise<void> => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  try {
    await db.executeSql(query);
    console.log(`🗑️ Dropped table '${tableName}'`);
  } catch (error) {
    console.error(`❌ Failed to drop table '${tableName}':`, error);
    throw error;
  }
};

export const truncateTable = async (
  db: SQLiteDatabase,
  tableName: string
): Promise<void> => {
  const query = `DELETE FROM ${tableName}`;
  try {
    await db.executeSql(query);
    console.log(`🧹 Truncated table '${tableName}'`);
  } catch (error) {
    console.error(`❌ Failed to truncate table '${tableName}':`, error);
    throw error;
  }
};

export const insertItem = async (
  db: SQLiteDatabase,
  tableName: string,
  columns: string[],
  values: (string | number | null)[]
): Promise<void> => {
  const placeholders = values
    .map(() => {
      return `?`;
    })
    .join(`,`);
  const query = `INSERT INTO ${tableName} (${columns.join(
    `,`
  )}) VALUES (${placeholders})`;
  await db.executeSql(query, values);
};

export const insertItems = async (
  db: SQLiteDatabase,
  tableName: string,
  columns: string[],
  valuesArr: (string | number | null)[][]
): Promise<void> => {
  if (!valuesArr.length) {
    return;
  }

  const placeholders = columns
    .map(() => {
      return `?`;
    })
    .join(`,`);

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        for (const [i, values] of valuesArr.entries()) {
          if (values.length !== columns.length) {
            console.warn(`Skipping row ${i + 1}: column/value mismatch`);
            continue;
          }

          const query = `INSERT INTO ${tableName} (${columns.join(
            `,`
          )}) VALUES (${placeholders})`;

          tx.executeSql(
            query,
            values,
            () => {
              console.log(`✅ Inserted row ${i + 1}:`, values);
            },
            (_tx, error) => {
              console.error(`❌ Failed to insert row ${i + 1}:`, error);
              return true; // Stops the transaction
            }
          );
        }
      },
      (error) => {
        console.error(`❌ Transaction failed:`, error);
        reject(error);
      },
      () => {
        console.log(`✅ Inserted ${valuesArr.length} rows into '${tableName}'`);
        resolve();
      }
    );
  });
};

export const getItems = async <T>(
  db: SQLiteDatabase,
  tableName: string,
  columns?: string[],
  filters?: Filters,
  filterJoin: `AND` | `OR` = `AND`
): Promise<T[]> => {
  const selectedCols = columns?.length ? columns.join(`, `) : `*`;

  const whereKeys = filters ? Object.keys(filters) : [];

  // Build conditions, handling array or string values per filter key
  const whereConditions: string[] = [];
  const values: string[] = [];

  whereKeys.forEach((key) => {
    const filterValue = filters![key];
    if (Array.isArray(filterValue)) {
      // Multiple LIKE clauses for the same key joined with OR, wrapped in parentheses
      const likeConditions = filterValue
        .map(() => {
          return `${key} LIKE ?`;
        })
        .join(` OR `);
      whereConditions.push(`(${likeConditions})`);
      values.push(...filterValue);
    } else {
      whereConditions.push(`${key} LIKE ?`);
      values.push(filterValue);
    }
  });

  const whereClause = `WHERE 1=1${
    whereConditions.length
      ? ` AND ${whereConditions.join(` ${filterJoin} `)}`
      : ``
  }`;

  const query = `SELECT ${selectedCols} FROM ${tableName} ${whereClause}`;

  try {
    const results = await db.executeSql(query, values);
    const items: T[] = [];

    results.forEach((result) => {
      for (let i = 0; i < result.rows.length; i++) {
        items.push(result.rows.item(i) as T);
      }
    });

    return items;
  } catch (error) {
    console.error(`❌ Failed to fetch from '${tableName}':`, error);
    throw error;
  }
};

export const updateItem = async (
  db: SQLiteDatabase,
  tableName: string,
  updates: Record<string, any>,
  id: number
): Promise<void> => {
  const setClause = Object.keys(updates)
    .map((key) => {
      return `${key} = ?`;
    })
    .join(`, `);
  const values = [...Object.values(updates), id];
  const query = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;
  await db.executeSql(query, values);
};

export const deleteItem = async (
  db: SQLiteDatabase,
  tableName: string,
  id: number
): Promise<void> => {
  await db.executeSql(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
};
