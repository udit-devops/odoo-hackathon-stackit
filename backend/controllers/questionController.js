const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const question = await Question.create({
      title,
      description,
      tags,
      user: req.userId,
    });
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create question' });
  }
};

exports.getAllQuestions = async (req, res) => {
  const questions = await Question.find().populate('user', 'name');
  res.json(questions);
};

exports.getSingleQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id).populate('user', 'name');
  res.json(question);
};

exports.voteQuestion = async (req, res) => {
  const { voteType } = req.body; // "up" or "down"
  const question = await Question.findById(req.params.id);
  question.votes += voteType === "up" ? 1 : -1;
  await question.save();
  res.json({ votes: question.votes });
};
