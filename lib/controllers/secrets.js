const { Router } = require('express');
const { Secrets } = require('../models/Secret');

module.exports = Router()

  .get('/', async (req, res) => {
    const allSecrets = await Secrets.getAll();
    console.log('!!!!!', allSecrets);
    res.json(allSecrets);
  })




;
 
