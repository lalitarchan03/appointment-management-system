const User = require('../models/user');

exports.postAddUser = async (req, res, next) => {
    // console.log('req', req.body);
    // console.log('req', req.body.phoneNumber, req.body.email)
    if(!req.body.phoneNumber || !req.body.email) {
        throw new Error('Phone number or Email is not filled');
    };
    // console.log('##############')
    // console.log(req.headers)
    // console.log('req', req.body)
    // console.log('after req')
    try {
        console.log('body', req);
        const {name, email, phoneNumber} = req.body;
        // const name = req.body.name;
        // const email = req.body.email;
        // const phoneNumber = req.body.phoneNumber;
        const data = await User.create({ name: name, email: email, phoneNumber: phoneNumber});

        // console.log('data', res.data);
        res.status(201).json({newUserDetail: data});
        // console.log('data',data);
        // res.status(201).json({newUserDetail: data});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: err});
    };
};

exports.getUsers = (req, res, next) => {
    // console.log('$$$$$$$$$$$$$')
    // console.log(req.headers)
    // console.log(req)
    User.findAll()
        .then(data => {
            res.status(200).json({allUserDetail: data});
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
};

exports.deleteOrEditUser = async (req, res, next) => {

    try{
        if (req.params.userId === 'undefined') {
            console.log('ID is misssing');
            return res.status(400).json({err: 'ID is missing'});
        }

        userIdToDel = req.params.userId;
        // console.log(userIdToDel);

        await User.destroy({
            where: {
                userId: userIdToDel
            },
        })
        console.log('DELETED PRODUCT');
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    
};