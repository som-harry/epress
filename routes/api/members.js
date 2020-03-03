const express = require('express');
const uuid = require();
const router = express.Router();
const members = require('../../members');

// Get all members
router.get('/', (req,res) => res.json(members)
);

//Get a single user
router.get('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else {
        res.status(400).json(`{msg: Member not found with id of ${req.params.id}}`);
    }
});

// Create a member
router.post('/', (req,res) => {
    const newMemeber = {

    }
});
module.exports = router;