const signin = (req, resp, db, bcrypt) => {
    const {email, password} = req.body;
    
    if (!email || !password) {
        return resp.status(400).json('Incorrect form submission!');
    }
    
    db.select('email', 'hash').table('login')
        .where({
            email: email
        })
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select().table('user')
                    .where({
                        email: email
                    })
                    .then(user => {
                        console.log('Logged in user ', user[0])
                        resp.json(user[0]);
                    })
                    .catch(err => resp.status(400).json('Not found'));
            } else {
                resp.status(400).json('Wrong credentials');
            }
        })
        .catch(err => resp.status(400).json('Wrong credentials'));
};

export default signin;