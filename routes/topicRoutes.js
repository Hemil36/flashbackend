import express from 'express';
import { addTopic, createNewTopic, deleteTopic, getUserTopics, TopicName } from '../controllers/topicController.js';

const router = express.Router();

router.get('/:user_id', getUserTopics);
router.post('/new',addTopic)
router.delete("/:topic_id", deleteTopic )
router.get("/topic/:topic_id",TopicName)
export default router;
