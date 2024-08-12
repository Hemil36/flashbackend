import express from 'express';
import { createNewFlashcard, deleteFlashcard, getFlashcardById, getTopicFlashcards, updateFlashcard } from '../controllers/flashcardController.js';
import { deleteFlashcardById } from '../models/Flashcard.js';

const router = express.Router();

router.post('/', createNewFlashcard);
router.get('/:topic_id', getTopicFlashcards);
router.get('/:topic_id/:flashcard_id', getFlashcardById);
router.put('/:flashcard_id', updateFlashcard);
router.delete('/:flashcard_id', deleteFlashcard);

export default router;
