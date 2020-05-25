import crypto from 'crypto';

import RespondersModel from '../models/responders.model';

const RespondersController = {};

RespondersController.insert = (req, res) => {
  if (req.body.password !== req.body.passwordcheck) {
    // I think this should be handled on the front-end
    // console.log('passwords dont match');
    res.send('passwords dont match');
  } else {
    const saltp = crypto.randomBytes(16).toString('base64');
    const hashp = crypto.createHmac('sha512', saltp).update(req.body.password).digest('base64');
    req.body.password = `${saltp}$${hashp}`;
    RespondersModel.createResponder(req.body).then((result) => {
      res.status(201).send({ id: result.id });
    });
  }
};

export default RespondersController;
