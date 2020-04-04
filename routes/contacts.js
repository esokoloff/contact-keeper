const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/contacts
// @desc      Add new user contact
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('email', 'Email is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route     PUT api/contacts/:id
// @desc      Update user contact
// @access    Private
router.put(
  '/:id',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('email', 'Email is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, data) => {
          if (err) {
            console.log(err);
            throw new Error(err);
          }
          if (!data) {
            return res
              .status(400)
              .json({ error: 'The given ID does not exist' });
          }
          res.send(data);
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// @route     DELETE api/contacts/:id
// @desc      Delete user contact
// @access    Private
router.delete('/:id', (req, res) => {
  try {
     Contact.findByIdAndDelete(req.params.id, (err, data) => {
      console.log(data);
      if (err) {
        console.log(err);
        throw new Error(err);
      }
      if (!data) {
        return res.status(400).json({ error: 'The given ID does not exist' });
      }

      res.sendStatus(204);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
