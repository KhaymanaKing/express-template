const { Router } = require('express');
const Item = require('../models/InvItem');
const authorizeInv = require('../middleware/authorizeInv');

module.exports = Router()
  .param('id', (req, res, next, id) => {
    req.id = id;
    next();
  })
//adding new inventory item to the database
  .post('/', async({ body, user }, res, next) => {
    try {
      const item = await Item.insert({ ...body, user_id: user.id });
      res.json(item);
    } catch (e) {
      next (e);
    }
  })
  //get item by item id in database
  .get('/:id', authorizeInv, async ({ id }, res, next) => {
    try{
      const items = await Item.getById(id);
      res.json(items);
    } catch (e){
      next(e);
    }
  })
  //get all items that is under a certain user
  .get('/', async ({ user }, res, next) => {
    try{
      const items = await Item.getAll(user.id);
      res.json(items);
    } catch (e){
      next(e);
    }
  })
  //update an item by the user id and the item id
  .put('/:id', authorizeInv, async ({ id, user, body }, res, next) => {
    try{
      const item = await Item.updateById(id, user.id, body);
      res.json(item);
    } catch (e){
      next (e);
    }
  })
  // remove an item from the database by item id.
  .delete('/:id', authorizeInv, async ({ id }, res, next) => {
    try{ 
      const item = await Item.delete(id);
      res.json(item);
    } catch (e) {
      next (e);
    }
  });
