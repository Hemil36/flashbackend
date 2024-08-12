import supabase from '../config/db.js';

export const createTopic = async (topicName, user_id) => {
  const { data, error } = await supabase
    .from('topics')
    .insert([{ topic_name: topicName, user_id }]).select();

  return data;
};

export const getTopicsByUserId = async (user_id) => {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('user_id', user_id);

  if (error) throw error;
  return data;
};

export const deleteTopicById = async (topic_id) => {
  const { data, error } = await supabase
    .from('topics')
    .delete()
    .eq('topic_id', topic_id).select();

  if (error !=null) throw error;
  return data;
};
