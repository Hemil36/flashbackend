import { createFlashcard, deleteFlashcardById, getFlashcardsById, getFlashcardsByTopicId, getTopicName, updateFlashcardById } from '../models/Flashcard.js';

export const createNewFlashcard = async (req, res) => {
  try {
    const { question, answer, topic_id } = req.body;
    const results = await createFlashcard(question, answer, topic_id);
    res.status(201).json({ message: 'Flashcard created successfully', flashcard_id: results[0].id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating flashcard' });
  }
};

export const getTopicFlashcards = async (req, res) => {
  try {
    const topic_id = req.params.topic_id;
    const results = await getFlashcardsByTopicId(topic_id);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching flashcards' });
  }
};

export const getFlashcardName = async (req, res) => {
  try {
    const topic_id = req.params.topic_id;
    const results = await getTopicName(topic_id);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching topic name' });
  }
};

export const getFlashcardById = async (req, res) => {
  try {
    const flashcard_id = req.params.flashcard_id;
    const results = await getFlashcardsById(flashcard_id);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching flashcard' });
  }
};

export const updateFlashcard = async (req, res) => {
  try {
    const flashcard_id = req.params.flashcard_id;
    const { question, answer } = req.body;
    const results = await updateFlashcardById(question, answer, flashcard_id);
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }
    
    res.status(200).json({ message: 'Flashcard updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating flashcard' });
  }
};

export const deleteFlashcard = async (req, res) => {
  try {
    const flashcard_id = req.params.flashcard_id;
    const results = await deleteFlashcardById(flashcard_id);
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    res.status(200).json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting flashcard' });
  }
};
