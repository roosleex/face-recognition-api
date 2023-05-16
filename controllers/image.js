const image = (req, resp, db) => {
    const {id} = req.body;
    db('user').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            resp.json(entries[0].entries);
        })
        .catch(err => resp.status(400).json('Unable to get entries'));
};

export default image;