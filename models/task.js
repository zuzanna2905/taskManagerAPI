class Task  {
    constructor (userid, task, category, priority){
        userid = userid,
        task = task,
        category = category,
        priority = priority,
        timestamp = new Date()
    }
}

module.exports = {
    Task: Task
}