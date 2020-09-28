const server = require("express").Router();
const { Product, Categories, Img } = require("../db.js");
const { Op } = require("sequelize");

server.get("/", (req, res, next) => {
  const { showOutStock } = req.query;
  if (!showOutStock) {
    Product.findAll({
      where: {
        stock: {
          [Op.gt]: 0,
        },
      },
      include: [Img, Categories],
    })
      .then((products) => {
        res.send(products);
      })
      .catch(next);
  } else {
    Product.findAll({ include: [Img, Categories] })
      .then((products) => {
        res.send(products);
      })
      .catch(next);
  }
});
server.get("/:productId", (req, res, next) => {
  const id = parseInt(req.params.productId);

  if (!(id > 0)) {
    next();
  } else {
    Product.findAll({
      where: { id },
      include: [Img, Categories],
    })
      .then((products) => {
        res.send(products);
      })
      .catch(next);
  }
});

server.post("/search/", (req, res, next) => {
  Product.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.iLike]: "%" + req.body.search + "%",
          },
        },
        {
          description: {
            [Op.iLike]: `%${req.body.search}%`,
          },
        },
      ],
    },
    include: [Img, Categories],
  })
    .then((products) => {
      res.send({ products });
    })
    .catch(next);
});

server.post("/", (req, res) => {
  const { name, description, price, stock, img } = req.body;

  if (!name || !description || !price || !stock || !img) {
    return res.status(400).send({ text: "Invalid data" });
  }

  let id = null;

  Product.create({
    name,
    description,
    price,
    stock,
  })
    .then((createdProduct) => {
      id = createdProduct.dataValues.id;

      let promises = img.map((Url) => createdProduct.createImg({ url: Url }));

      return Promise.all(promises);
    })
    .then(() => {
      return Product.findOne({ where: { id: id }, include: Img });
    })
    .then((product) => {
      res.send({ text: "Product created", product: product });
    })
    .catch((err) => {
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    });
});

server.put("/:id", (req, res) => {
  const { name, price, stock, img, description } = req.body;

  let test = parseInt(req.params.id);
  if (!(test > 0)) {
    return next();
  }

  let prod = null;

  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: Img,
  })
    .then((product) => {
      prod = product;

      if (img && img.length && img[0].length) {
        prod.imgs = prod.imgs.filter(async (image, index) => {
          if (img.indexOf(image.url) >= 0) {
            img.splice(img.indexOf(image.url), 1);
            return image.url;
          } else {
            await image.destroy();
            prod.imgs.splice(index, 0);
          }
        });

        let promises = img.map((img) => prod.createImg({ url: img }));

        return Promise.all(promises);
      } else {
        return prod;
      }
    })
    .then(() => {
      if (name) prod.name = name;

      if (price) prod.price = price;

      if (stock) prod.stock = stock;

      if (description) prod.description = description;

      return prod.save();
    })
    .then((prod) => {
      res.send({ product: prod });
    });
});

server.delete("/:productId", (req, res, next) => {
  const id = parseInt(req.params.productId);

  if (!(id > 0)) {
    next();
  } else {
    Product.findByPk(id)
      .then((product) => {
        return product.destroy();
      })
      .then(() => {
        res.send({ text: "Product deleted" });
      })
      .catch((err) => {
        res.status(500).send({ text: err });
      });
  }
});

// rutas para setear categorias a objetos

server.put("/:productId/:categoryId", (req, res, next) => {
  const { productId, categoryId } = req.params;

  console.log(req.params);

  let test = parseInt(productId);
  if (!(test > 0)) {
    return next();
  }

  prodNcat = Promise.all([
    Product.findByPk(productId),
    Categories.findByPk(categoryId),
  ]);
  prodNcat.then((data) => {
    data[0]
      .addCategory(data[1])
      .then((state) => {
        res.send({ text: state });
      })
      .catch((err) => {
        res.status(500).send({ text: err });
      });
  });
});

server.delete("/:productId/:categoryId", (req, res, next) => {
  const { productId, categoryId } = req.params;

  let test = parseInt(productId);
  if (!(test > 0)) {
    return next();
  }

  prodNcat = Promise.all([
    Product.findByPk(productId),
    Categories.findByPk(categoryId),
  ]);
  prodNcat.then((data) => {
    data[0]
      .removeCategory(data[1])
      .then((state) => {
        res.send({ text: state });
      })
      .catch((err) => {
        res.status(500).send({ text: err });
      });
  });
});

server.get("/searchByCategory/:categoryId", (req, res) => {
  const { categoryId } = req.params;

  let products = null;
  let images = null;

  const end = () => {
    for (const key in products) {
      const img = images.filter(
        (image) => image.productId === products[key].id
      );
      products[key].dataValues.imgs = img;
      //console.log(products[key]);
    }

    res.send({ products: products || [] });
  };

  const catPromise = Categories.findByPk(categoryId)
    .then((cats) => {
      return cats.getProducts();
    })
    .then((prods) => {
      //console.log(prods)
      products = prods;
      if (images !== null) end();
    });

  const imgPromise = Img.findAll().then((imgs) => {
    images = imgs;
    if (products !== null) end();
  });
});

//ruta para obtener los productos por categoria
/*server.get('/searchByCategory/:categoryId', (req, res) => {
	const categoryId = req.params.categoryId;
	var  prod ;
  	Categories.findByPk(categoryId)
	.then(category => {
	  return category.getProducts()
	})
  	.then(products => {
	prod = products;
	return Img.findAll()
	})
  	.then(imgs => {
	  for(var i=0; i< prod.length; i++){
	    for(var j=0; j< imgs.length; j++){
	      if(prod[i].id === imgs[j].productId){
		prod.imgs = imgs[j];
	      }
	    }
	  }
	  res.send(prod);
	})
  	
})*/

server.get("/selectors", (req, res) => {
  Categories.findAll({
    order: [["id", "ASC"]],
  })
    .then((cats) => {
      let response = {};
      for (let i = 0; i < cats.length; i++) {
        if (response[cats[i].name]) {
          response[cats[i].name].push({
            id: cats[i].id,
            description: cats[i].description,
          });
        } else {
          response[cats[i].name] = [
            { id: cats[i].id, description: cats[i].description },
          ];
        }
      }

      res.send({ selectors: response });
    })
    .catch((err) => {
      res.status(500).send({ text: "Internal error." });
      console.error(err);
    });
});

/*CRUD de Categorías*/

server.post("/category", (req, res) => {
  const { name, description } = req.body;

  console.log(req.body);

  if (!name || typeof name !== "string" || name.length <= 0) {
    return res.status(400).send({ text: "Invalid name" });
  }
  if (
    !description ||
    typeof description !== "string" ||
    description.length <= 0
  ) {
    return res.status(400).send({ text: "Invalid description" });
  }
  Categories.findOne({
    where: {
      name,
      description,
    },
  }).then((cat) => {
    if (cat !== null) {
      return res.status(400).send({ text: "Category already exists" });
    } else {
      const category = Categories.build({ name, description });

      category
        .save()
        .then(() =>
          res.send({ text: "Category created", category: category.dataValues })
        )
        .catch((err) => {
          res.status(500).send({ text: "Internal error" });
          console.error(err);
        });
    }
  });
});
server.get("/category", (req, res) => {
  Categories.findAll({
    order: [["id", "ASC"]],
  })
    .then((cats) => {
      res.send(cats);
    })
    .catch((err) => {
      res.status(500).send({ text: "Internal error." });
      console.error(err);
    });
});

server.get("/category/:id", (req, res) => {
  const { id } = req.params;
  if (id === undefined) {
    return res.status(400).send("You must use a valid id");
  }
  Categories.findOne({
    where: {
      id: parseInt(id),
    },
  })
    .then((category) => {
      res.status(200).send(category);
    })
    .catch((err) => {
      res.status(404).send("Page not found :" + err);
    });
});
server.put("/category/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  console.log(req.params, req.body);

  if (id === undefined || name === undefined) {
    return res.status(400).send({ text: "Invalid id" });
  }

  Categories.findOne({
    where: {
      id: parseInt(id),
    },
  })
    .then((cat) => {
      cat.name = name;
      cat.description = description;
      return cat.save();
    })
    .then(() => {
      res.send({ text: "Category updated." });
    })
    .catch((err) => {
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    });
});
server.delete("/category/:id", (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    return res.status(400).send({ text: "Invalid id" });
  }

  Categories.destroy({
    where: {
      id: parseInt(id),
    },
  })
    .then(() => {
      res.send({ text: "Category deleted" });
    })
    .catch(() => {
      res.status(500).send({ text: "Internal error" });
    });
});

module.exports = server;
