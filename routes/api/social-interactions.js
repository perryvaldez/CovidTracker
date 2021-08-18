const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const utils = require("./lib/utils");

const SocialInteraction = require("../../models/SocialInteraction");

// @route   GET api/social-interactions
// @desc    Get all social interactions
router.get("/", async (req, res) => {
  try {
    const { limit, offset } = utils.getPagination(req.query);

    let socialInteractions = [];

    if(limit < 1) {
      socialInteractions = await SocialInteraction.find(
        utils.makeFilter(req.query)).sort({
        date: -1,
        _id: -1,
      });
    } else {
      socialInteractions = await SocialInteraction.find(
        utils.makeFilter(req.query)).sort({
        date: -1,
        _id: -1,
      }).limit(limit).skip(offset);
    }
    
    res.json(socialInteractions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/social-interactions/count
// @desc    Count all social interactions
router.get("/count", async (req, res) => {
  try {
    const count = await SocialInteraction.find(utils.makeFilter(req.query)).countDocuments();
    res.json(count);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/social-interactions/field
// @desc    Get all values of the named field
router.get("/field", async (req, res) => {
  try {
    const result = await utils.makeAggregate(SocialInteraction, req.query);
    res.json(result.map((item) => item._id));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/social-interactions/:id
// @desc    Get social interaction by Id
router.get("/:id([0-9a-f]+)", async (req, res) => {
  try {
    const socialInteraction = await SocialInteraction.findById(req.params.id);

    if (!socialInteraction) {
      return res.status(404).json({ msg: "Record not found." });
    }

    res.json(socialInteraction);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Record not found." });
    }

    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/social-interactions
// @desc    Add new social interaction
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("date", "Date is required").not().isEmpty(),
    check("hours", "Hours is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newSocialInteraction = new SocialInteraction({
        name: req.body.name,
        date: req.body.date,
        hours: req.body.hours,
        isSocialDistancing: req.body.isSocialDistancing,
      });

      await newSocialInteraction.save();

      return res.json(newSocialInteraction);
    } catch (err) {
      console.error(err.message);

      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/social-interactions
// @desc    Delete by Id
router.delete("/:id", async (req, res) => {
  try {
    const socialInteraction = await SocialInteraction.findById(req.params.id);

    if (!socialInteraction) {
      return res.status(404).json({ msg: "Record not found." });
    }

    await socialInteraction.remove();

    res.json({ msg: "Social interaction removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Record not found." });
    }

    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/social-interactions/:id
// @desc    Update social interaction
router.put(
  "/:id",
  [
    check("name", "Name is required").not().isEmpty(),
    check("date", "Date is required").not().isEmpty(),
    check("hours", "Hours is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, date, hours, isSocialDistancing } = req.body;

      const socialInteraction = await SocialInteraction.findById(req.params.id);

      if (!socialInteraction) {
        return res.status(404).json({ msg: "Record not found." });
      }

      if (name) socialInteraction.name = name;
      if (date) socialInteraction.date = date;
      if (hours) socialInteraction.hours = hours;
      if (isSocialDistancing !== undefined)
        socialInteraction.isSocialDistancing = isSocialDistancing;
      await socialInteraction.save();

      res.json(socialInteraction);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
