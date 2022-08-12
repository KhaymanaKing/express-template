const Item = require('../models/InvItem');

module.exports = async (req, res, next) => {
  try{
    const item = await Item.getById(req.params.id);
    if(!item || item.user_id !== req.user.id) {
      throw new Error('No access');
    }
    next();
  } catch(e){
    e.status = 403;
    next(e);
  }
};
