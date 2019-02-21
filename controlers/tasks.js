//TODO
//task model
//user hash - is autorizated operation

const getTasks = (db) => (req,res) => {
  const { userid } = req.query;
  db.select('*')
  .from('tasks')
  .where('userid', '=', userid)
  .then(tasks => res.status(200).json(tasks))
  .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

const getTask = (db) => (req,res) => {
  const { userid } = req.query;
  db.select('*')
  .from('tasks')
  .where('id', '=', parseInt(req.params.id), '&',  'userid', '=', userid)
  .then(tasks => res.status(200).json(tasks))
  .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

const addTask = (db) => (req,res) => {
  const { userid, task, category='1', priority='1' } = req.query;
  db.insert(
    { userid: userid, 
      task:task, 
      category:category, 
      priority:priority, 
      timestamp: new Date()
    })
  .into('tasks')
  .then(a => res.status(200).json('new tasks added'))
  .catch(err => res.status(400).json(err, ':', 'unable to add data'))
}

const deleteTask = (db) => (req,res) => {
  db('tasks')
  .where('id', '=', parseInt(req.params.id))
  .del()
  .then(a => res.status(200).json('task deleted'))
  .catch(err => res.status(400).json(err, ':', 'unable to delete data'))
}

const updateTask = (db) => (req,res) => {
  const { userid, task, category, priority } = req.query;
  db('tasks')
  .where('id', '=', req.params.id)
  .update(
    { userid: userid, 
      task:task, 
      category:category, 
      priority:priority, 
      timestamp: new Date()
    })
  .then(a => res.status(200).json('task edited'))
  .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

module.exports = {
    getTasks: getTasks,
    addTask: addTask,
    getTask: getTask,
    deleteTask: deleteTask,
    updateTask: updateTask
}