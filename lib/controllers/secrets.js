const { Router } = require('express');
const { Secrets } = require('../models/Secret');

module.exports = Router()

  .get('/', async (req, res) => {
    const allSecrets = await Secrets.getAll();
    res.json(allSecrets);
  })




;
 
