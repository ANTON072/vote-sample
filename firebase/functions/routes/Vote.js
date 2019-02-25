const Base = require('./Base');

module.exports = class Vote extends Base {
  constructor() {
    super();
  }

  render(req, res) {
    res.status(200).json({ message: 'success2' });
  }
};
