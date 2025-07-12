const Answer = require('../models/Answer');

exports.postAnswer = async (req, res) => {
  const { content } = req.body;
  const answer = await Answer.create({
    content,
    question: req.params.id,
    user: req.userId,
  });
  res.status(201).json(answer);
};

exports.voteAnswer = async (req, res) => {
  const { voteType } = req.body;
  const answer = await Answer.findById(req.params.id);
  answer.votes += voteType === "up" ? 1 : -1;
  await answer.save();
  res.json({ votes: answer.votes });
};

exports.acceptAnswer = async (req, res) => {
  const answer = await Answer.findById(req.params.id);
  answer.isAccepted = true;
  await answer.save();
  res.json({ message: 'Answer accepted' });
};
