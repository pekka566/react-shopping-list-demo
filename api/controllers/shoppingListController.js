const Datastore = require('nedb');

const db = new Datastore({ filename: 'nedb', autoload: true });

exports.list_all_items = (req, res) => {
  db.find({}, (err, docs) => {
    res.json(docs);
  });
};

exports.create_an_item = (req, res) => {
  const body = req.body;
  if (!body) {
    res.json({
      error: 'Body is missing!',
    });
  } else {
    const doc = {
      id: body.id,
      count: body.count,
      name: body.name,
      date: body.date,
      category: body.category,
    };
    db.insert(doc);
    res.json({ doc });
  }
};

exports.delete_an_item = (req, res) => {
  const itemId = req.params.itemId;
  if (!itemId) {
    res.json({
      error: 'Item id is missing!',
    });
  } else {
    db.remove({ id: itemId }, {}, (err, numDeleted) => {
      res.json({
        deleted: numDeleted,
      });
    });
  }
};
