const server = require('express').Router();
const { Reviews, Product, User, InfoUser } = require('../db.js');

server.get('/:productId', (req, res)=> {
    Product.findAll({
      where:{id: req.params.productId},
      include: {
	model:Reviews,
	include:{
	  model: User,
	  include:{
	    model: InfoUser
	  }
	}
      }
    })
    .then(reviews => {
      res.send({text: 'reviews logged', reviews: reviews[0].reviews});
    }).catch(error=>{
        res.status(500).send({text: error})
    });
})
server.get('/user/:userId', (req, res)=> {
    User.findAll({
      where: { id : req.params.userId },
      include:[{
            model: InfoUser,
      },{
	    model: Reviews,
	    include: {
	      model: Product
	    }
            }],
      })
    .then(reviews => {
      res.send({
	text: 'reviews logged', 
	user: reviews[0].infoUser,
	reviews: reviews[0].reviews

      });
    }).catch(error=>{
        res.status(500).send({text: error})
    });
})

server.post('/', (req, res)=>{
    const {commentary, rating, productId, userId} = req.body
    if(!commentary || typeof commentary !== 'string' || commentary.length <= 0) {
		return res.status(400).send({text: 'Invalid commentary'});
    }
    if(!rating || typeof rating !== 'number' || rating.length <= 0) {
		return res.status(400).send({text: 'Invalid rating'});
    }
    prodNuser= Promise.all([ Product.findByPk(productId),User.findByPk(userId)])
    prodNuser.then(data=>{
      data[0].createReview({ commentary, rating })
      .then(review => {
       return data[1].addReview(review)
      })
	.then(data => {
	  return data.getReviews()
	})
	.then(rev => res.send({text: 'Review created ', reviews: rev  })) 
    })

})

server.delete('/:id', (req, res)=>{
    const {id} = req.params
    if(id === undefined) {
		return res.status(400).send({ text: 'Invalid id' });
    }
    Reviews.destroy({
		where: {
			id: parseInt(id)
		}
	}).then(() => {
		res.send({ text: 'Review deleted'});
	}).catch(() => {
		res.status(500).send({ text: 'Internal error'});
	})

})

server.put('/:id', (req,res)=>{
  const {id} = req.params;
  const{commentary} = req.body
  if(!id)return res.status(400).send({ text: 'Invalid id' });

  Reviews.findOne({
    where: {
      id: parseInt(id)
    }
  }).then(rev=>{
    rev.commentary = commentary;
    return rev.save()
  }).then((review) => {
		res.send({ text: 'Review updated.', review: review });
	}).catch(err => {
		res.status(500).send({ text: 'Internal error' });
		console.error(err);
	})
})



module.exports = server;
