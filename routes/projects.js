// PATH /api/project
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const {
    createProject,
    getProjects,
    updateProject,
    deleteProject
} = require('../controllers/projectController')
const auth = require('../middleware/auth')

router.post('/',
    auth, // middleware validate token for register project
    [check('name', 'Name is required').not().isEmpty()],
    createProject
)

router.get('/',
    auth, // middleware validate token for view all projects
    getProjects
)

router.put('/:id',
    auth, // middleware validate token for update project
    [check('name', 'Name is required').not().isEmpty()],
    updateProject
)

router.delete('/:id',
    auth, // middleware validate token for delete project
    deleteProject
)

module.exports = router