const { Router } = require("express");
const router = Router();
const _ = require("lodash");
const authors = require("../../authors.json");

router.get("/authors", (req, res) => {
  res.json(authors);
});

router.post("/authors", (req, res) => {
  const { id, name, lastname } = req.body;
  if (id && name && lastname) {
    const newAuthor = { ...req.body };
    authors.push(newAuthor);
    res.json({ added: "ok" });
  } else {
    res.status(400).json({ statusCode: "Bad Request" });
  }
});

router.put("/authors/:id", (req, res) => {
  const AuthorID = req.params.id;
  const { id, name, lastname } = req.body;
  console.log(name);
  _.each(authors, (author) => {
    if (author.id == AuthorID) {
      author.name = name ? name : author.name;
      author.lastname = lastname ? lastname : author.lastname;

      res.json({ modified: "ok" });
    } else {
      res.status(400).json({
        statusCode: "Bad Request, author data could not be modified.",
      });
    }
  });
});

router.delete("/authors/:id", (req, res) => {
    const id = req.params.id;
    _.remove(authors, (author) => {
      return author.id == id;
    });
    res.json(authors);
});

/*router.delete("/authors/:id", (req, res) => {
  const id = req.params.id;
  _.remove(authors, (author) => {
    return author.id == id;
  });
  res.json(authors);
});*/

module.exports = router;
