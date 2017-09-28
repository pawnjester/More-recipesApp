import db from '../models/db';


class UpVotes {
  upVote(req,res) {
    if(req.query.sort === 'upvotes' && req.query.order ==='desc') {
      const compare = ((a,b) => b.upVotes - a.upVotes);
      const up = [db.recipes.sort(compare)];

      return res.status(200).send(up);
    }
  }
}

export default UpVotes;