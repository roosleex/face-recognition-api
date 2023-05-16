const register = (req, resp, db, bcrypt) => {
    const {email, name, password} = req.body;
    
    if (!email || !name || !password) {
        return resp.status(400).json('Incorrect form submission!');
    }

    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
          hash: hash,
          email: email  
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            const newUser = {
                name: name,
                email: loginEmail[0].email,
                joined: new Date()
            }

            trx('user')
            .returning('*')
            .insert(newUser)
            .then(user => {
                console.log('Registered user', user[0]);
                resp.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => resp.status(400).json('Unable to register!'));
};

export default register;