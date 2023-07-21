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

router.get("/user/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const rating = await Rating.findAll({
      where: {
        userId,
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

router.get("/product/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const rating = await Rating.findAll({
      where: {
        productId,
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
    // const result = rating.map((rating) => {
    //   return {
    //     id: rating.id,
    //     productId: rating.productId,
    //     rate: rating.rate,
    //     review: rating.review,
    //     userId: rating.userId,
    //   };
    // });
    if (rating) {
      res.json(rating);
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
    const { rate, review, productId, userId } = req.body;

    const user = await User.findOne({
      where: {
        id:userId,
      },
    });

    const rating = await Rating.create({
      rate: parseInt(rate),
      review,
      productId: parseInt(productId),
      userId: userId,
    });

    res.json(rating);
  } catch (e) {
    next(e);
  }
});

router.put("/update/:rating_id", async (req, res, next) => {
  const { rating_id } = req.params;

  if (!req.body) res.send("The form is empty");

  try {
    const { productId, id, rate, review } = req.body;
    const rating = await Rating.findByPk(parseInt(rating_id));
    const user = await User.findOne({
      where: {
        id,
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
}); 

router.get("/sum/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    // Consultar la sumatoria de los ratings por productId
    const result = await Rating.sum("rating", {
      where: { productId },
    });

    res.json({ sum: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;

