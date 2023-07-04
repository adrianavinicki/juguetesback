const { Router } = require("express");
const { Rating, Product, User } = require("../db.js");
const router = Router();

router.get("/", async (req, res, next) => {
  const { rating_id } = req.query;

  if (rating_id) {
    try {
      const rating = await Rating.findByPk(id, {
        include: [
          {
            model: Product,
            attributes: ["id"],
          },
          {
            model: User,
            attributes: ["first_name", "email"],
          },
        ],
      });
      const result = {
        id: rating.id,
        productId: rating.productId,
        rate: rating.rate,
        review: rating.review,
        userId: rating.UserId,
      };
      if (result) {
        res.json(result);
      } else {
        res.send("No matches were found");
      }
    } catch (e) {
      next(e);
    }
  } else {
    try {
      const ratings = await Rating.findAll({
        include: [
          {
            model: Product,
            attributes: ["id"],
          },
          {
            model: User,
            attributes: ["first_name", "email"],
          },
        ],
      });
      const result = ratings.map((rating) => {
        return {
          id: rating.rating_id,
          productId: rating.productId,
          rate: rating.rate,
          review: rating.review,
          userId: rating.userId,
        };
      });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
});

router.get("/:product_id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const rating = await Rating.findAll({
      where: {
        id,
      },
      include: [
        {
          model: Product,
          attributes: ["id"],
        },
        {
          model: User,
          attributes: ["first_name", "id"],
        },
      ],
    });
    const result = rating.map((rating) => {
      return {
        id: rating.id,
        productId: rating.productId,
        rate: rating.rate,
        review: rating.review,
        userId: rating.User,
      };
    });
    if (result) {
      res.json(result);
    } else {
      res.send("No matches were found");
    }
  } catch (e) {
    next(e);
  }
}); 

router.post("/create", async (req, res, next) => {
  if (!req.body) res.send("The form is empty");

  try {
    const { rate, review, productId, id } = req.body;

    const user = await User.findOne({
      where: {
        id,
      },
    });

    const rating = await Rating.create({
      rate: parseInt(rate),
      review,
      productId: parseInt(productId),
      userId: user.id,
    });

    const result = {
      id: rating.id,
      productId: rating.productId,
      rate: rating.rate,
      review: rating.review,
    };

    res.json(result);
  } catch (e) {
    next(e);
  }
});

/* router.put("/update/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!req.body) res.send("The form is empty");

  try {
    const { productId, email, rate, review } = req.body;
    const rating = await Rating.findByPk(parseInt(id));
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (rating) {
      await rating.update({
        rate: parseInt(rate),
        review,
        productId: parseInt(productId),
        userId: user.id,
      });
      const result = {
        id: rating.id,
        productId: rating.productId,
        rate: rating.rate,
        review: rating.review,
      };
      res.json(result);
    } else {
      res.send("No matches were found");
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const rating = await Rating.findByPk(parseInt(id));
    if (rating) {
      await rating.destroy();
      res.send("Rating deleted");
    } else {
      res.send("No matches were found");
    }
  } catch (e) {
    next(e);
  }
}); */

module.exports = router;
