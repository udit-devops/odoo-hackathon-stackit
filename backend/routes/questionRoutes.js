const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  voteQuestion,
} = require('../controllers/questioncontroller');

const router = express.Router();

router.post('/', protect, createQuestion);
router.get('/', getAllQuestions);
router.get('/:id', getSingleQuestion);
router.put('/:id/vote', protect, voteQuestion);

module.exports = router;
