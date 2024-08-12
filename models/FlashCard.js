import supabase from '../config/db.js';

export const createFlashcard = async (question, answer, topicId) => {
  const { data, error } = await supabase
    .from('flashcards')
    .insert([{ question, answer, topic_id: topicId }]).select();

  if (error) throw error;
  return data;
};

export const getFlashcardsByTopicId = async (topicId) => {
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('topic_id', topicId);

  if (error) throw error;
  return data;
};

export const getFlashcardsById = async (flashcardId) => {
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('flashcard_id', flashcardId);

  if (error) throw error;
  return data;
};

export const updateFlashcardById = async (question, answer, flashcard_id) => {
  const { data, error } = await supabase
    .from('flashcards')
    .update({ question, answer })
    .eq('flashcard_id', flashcard_id).select();

  if (error) throw error;
  return data;
};

export const deleteFlashcardById = async (flashcard_id) => {
  const { data, error } = await supabase
    .from('flashcards')
    .delete()
    .eq('flashcard_id', flashcard_id).select();

  if (error) throw error;
  return data;
};

export const getTopicName = async (topic_id) => {
  const { data, error } = await supabase
    .from('topics')
    .select('topic_name')
    .eq('topic_id', topic_id);

  if (error) throw error;
  return data;
};
