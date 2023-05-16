const profile = (req, resp, db) => {    
    const {id} = req.params;
    db.select().table('user')
        .where({
            id: id
        })
        .then(user => {
            if (user.length) {
                found = true;
                console.log(user);
                resp.json(user[0]);
            } else {
                resp.status(400).json('Not found');
            }
        })
        .catch(err => resp.status(400).json('Not found'));
};

export default profile;