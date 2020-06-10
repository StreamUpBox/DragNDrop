
export type ORDER = 'DESC' | 'ASC';

export class QueryService {

  protected query: string = null;
  protected extra: any = null;
  protected callback: any = () => { };
  constructor() { }


  ////////////////////////////// MODEL //////////////////////////////////////////////////////////////////////////

  public select<T>(TABLE: T, COLUMNS?: string) {
    this.query = `SELECT ${COLUMNS ? COLUMNS : '*'} FROM ${TABLE}`;
    return this;
  }

  public where(key: string, value: any, sign = '=') {
    let val = '';
    if (typeof value === 'string' || value instanceof String) {
      val = '\'' + value + '\'';
    } else {
      val = value;
    }
    this.query = this.query + ` WHERE
    ${key} ${sign.toUpperCase()}${sign.toUpperCase() === 'LIKE' ? '"%' + value + '%"' : val}`;
    return this;
  }

  public andWhere(key: string, value: any, sign = '=') {
    let val = '';
    if (typeof value === 'string' || value instanceof String) {
      val = '\'' + value + '\'';
    } else {
      val = value;
    }
    this.query = this.query + ` AND ${key} ${sign.toUpperCase()}${sign.toUpperCase() === 'LIKE' ? '"%' + value + '%"' : val}`;
    return this;
  }

  public orWhere(key: string, value: any, sign = '=') {
    let val = '';
    if (typeof value === 'string' || value instanceof String) {
      val = '\'' + value + '\'';
    } else {
      val = value;
    }
    this.query = this.query + ` OR ${key} ${sign.toUpperCase()}${sign.toUpperCase() === 'LIKE' ? '"%' + value + '%"' : val}`;
    return this;
  }
  protected condition(where: string) {
    this.query = this.query + `  WHERE ${where}`;
    return this;
  }

  protected insert<T>(TABLE: string, ROW: T) {
    this.extra = [];
    this.extra = [ROW];
    this.query = `INSERT INTO ${TABLE} VALUES ?`;
    return this;
  }


  protected updateRow<T>(TABLE: string, ROW: T, id: number) {
    this.extra = [];
    const value = Object.values(ROW);
    value.push(id);
    this.extra = value;
    this.query = `UPDATE ${TABLE} SET ${Object.keys(ROW).join('=?, ') + '=?'} WHERE id=?`;
    return this;
  }

  public orderBy(by: string, order: ORDER = 'DESC') {
    this.query = this.query + `  ORDER BY ${by} ${order}`;
    return this;
  }

  protected deleteRow<T>(TABLE: T, id: number) {
    this.query = `DELETE FROM ${TABLE} WHERE id=${id}`;
    return this;
  }
  protected truncateRows<T>(TABLE: T) {
    this.query = `DELETE FROM ${TABLE} `;
    return this;
  }



  protected groupBy() { }



  //////////////////////// DATABASE /////////////////////////////////////////////////////////////////////////////////

  protected createDatabase<T>(DB: T, ENGINE?: string) {
    this.extra = [];
    this.query = 'CREATE ' + ENGINE + ' DATABASE IF NOT EXISTS ' + DB + '; \
                   ATTACH ' + ENGINE + ' DATABASE ' + DB + '; \ USE ' + DB;
    return this;
  }

  protected attachDatabase<T>(NEWDB: T, OLDDB: string, ENGINE?: string) {
    this.query = `ATTACH ${ENGINE ? ENGINE : ''} DATABASE ${NEWDB} AS ${OLDDB}`;
    return this;
  }


  /////////////////////// SCHEMA //////////////////////////////////////////////////////////////////////////////////


  protected createTable<T>(TABLE: T, COLUMNS: string) {
    this.query = `CREATE TABLE IF NOT EXISTS ${TABLE} (${COLUMNS})`;
    return this;
  }

  protected showTable<T>(DB: T) {
    this.query = `SHOW TABLES FROM ${DB}`;
    return this;
  }


  protected dropTable<T>(TABLE: T) {
    this.query = `DROP TABLE IF EXISTS ${TABLE}`;
    return this;
  }

  protected renameTable<T>(OLDTABLE: T, NEWTABLE: T) {
    this.query = `RENAME TABLE ${OLDTABLE} TO ${NEWTABLE}`;
    return this;
  }

  protected addTableColumn<T>(TABLE: T, COLUMN: string) {
    this.query = `ALTER TABLE ${TABLE}  ADD COLUMN ${COLUMN}`;
    return this;
  }

  protected renameTableColumn<T>(TABLE: T, COLUMN: string) {
    this.query = `ALTER TABLE ${TABLE}  RENAME COLUMN ${COLUMN}`;
    return this;
  }

  protected dropTableColumn<T>(TABLE: T, COLUMN: string) {
    this.query = `ALTER TABLE ${TABLE}  DROP COLUMN ${COLUMN}`;
    return this;
  }

  protected renameTableTo<T>(OLDTABLE: T, NEWTABLE: T) {
    this.query = `ALTER TABLE ${OLDTABLE} RENAME TO ${NEWTABLE}`;
    return this;
  }
}
