const { Entrie } = require('../../db/models');

async function checkMessageOwner(req, res, next) {
  try {
    const { EntrieId } = req.params;
    const targetEntrie = await Entrie.findOne({ where: { id: EntrieId } });
    if (targetEntrie?.userId === res.locals?.user?.id) return next();
    return res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ text: error.message });
  }
}

module.exports = checkMessageOwner;
