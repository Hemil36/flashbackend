import { createTopic, deleteTopicById, getTopicsByUserId } from '../models/Topic.js';
import { getTopicName } from '../models/FlashCard.js';


export const createNewTopic = async (req, res) => {
    const { topic_name, user_id } = req.body;
    const results = await createTopic(topic_name, user_id);

   return  res.status(201).json({ message: 'Topic created successfully'});
 
};

export const getUserTopics = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const results = await getTopicsByUserId(user_id);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching topics' });
  }
};

export const addTopic = async (req, res) => {
  try {
    const { topic_name, user_id } = req.body;
    const results = await createTopic(topic_name, user_id);
    res.status(201).json({ message: 'Topic created successfully', topic_id: results[0].id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating topic' });
  }
};

export const TopicName = async (req, res) => {
  try {
    const topic_id = req.params.topic_id;
    const results = await getTopicName(topic_id);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching topic name' });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const topic_id = req.params.topic_id;
    const results = await deleteTopicById(topic_id);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    res.status(200).json({ message: 'Topic deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting topic' });
  }
};
