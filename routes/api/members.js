const express = require('express');
const uuid = require('uuid');
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
         id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "inactive"

    }
    if (!newMemeber.name || !newMemeber.email) {
        return res.status(400).json({msg:'please fill the fields below'});
    }

    members.push(newMemeber);
    res.json(members);
    // res.redirect('/');
});

// update member
router.put('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                
                res.json({ msg: 'updated member', member });
            }
        });
    }else {
        res.status(400).json({ msg:` member not found with the id ${req.params.id }` });
    }
});

//delete a request
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({ msg:'member deleted', 
        members: members.filter(member => member.id !== parseInt(req.params.id)) });
    }else {
        res.status(400).json({ msg:`member not found with the id ${req.params.id}`});
    }
});
module.exports = router;