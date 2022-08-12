const Item = require('../models/InvItem');
//confirms that there is an item, if there is an item then confirms
//that the user id matches with the requester id
// if no match responds with 'no access'
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
