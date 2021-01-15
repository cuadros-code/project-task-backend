// Path api/task
const express = require('express')
const router = express.Router()
const { getTasksByProject, createTasks, updateTask, deleteTask } = require('../controllers/taskController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')



router.post('/',
    auth,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('projectId', 'Project is required').not().isEmpty()
    ],
    createTasks)

router.get('/',
    auth,
    getTasksByProject)

router.put('/:id',
    auth,
    updateTask)

router.delete('/:id',
    auth,
    deleteTask
)


module.exports = router