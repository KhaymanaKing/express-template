const pool = require('../utils/pool');

module.exports = class Item {
  id;
  item;
  qty;
  user_id;

  constructor(row) {
    this.id = row.id;
    this.item = row.item;
    this.qty = row.qty;
    this.user_id = row.user_id;
  }
  static async insert({ item, qty, user_id }){
    const { rows } = await pool.query(
      `
        INSERT INTO inventory (item, qty, user_id)
        VALUES($1, $2, $3)
        RETURNING *
        `,
      [item, qty, user_id]
    );
    return new Item(rows[0]);
  }
};
