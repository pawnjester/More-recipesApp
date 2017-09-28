import db from '../models/db';


class UpVotes {
  upVote(req,res) {
    if(req.query.sort === 'upvotes' && req.query.order ==='des') {
      const compare = ((a,b) => b.upVotes - a.upVotes);
      const up = db.recipes.sort(compare);
      console.log(up)
      return res.status(200).send(up);
    }
  }
}

export default UpVotes;