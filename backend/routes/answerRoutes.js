const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  postAnswer,
  voteAnswer,
  acceptAnswer,
} = require('../controllers/answercontroller');

const router = express.Router();

router.post('/:id/answers', protect, postAnswer);
router.put('/:id/vote', protect, voteAnswer);
router.put('/:id/accept', protect, acceptAnswer);

module.exports = router;
