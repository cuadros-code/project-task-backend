const Task = require('../models/Task')
const Project = require('../models/Project')

const { validationResult } = require('express-validator')


const createTasks = async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
    }

    const { projectId } = req.body

    try {

        const project = await Project.findById(projectId)

        if (!project) {
            return res.status(400).json({
                msg: 'Project not found'
            })
        }

        if (project.creator.toString() !== req.user.id) {
            return res.status(400).json({
                ok: false,
                msg: 'action not allowed'
            })
        }

        const newTask = new Task(req.body)

        await newTask.save()

        res.json({
            ok: true,
            newTask
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            error
        })
    }
}

const getTasksByProject = async (req, res) => {

    const { projectId } = req.query

    try {

        const project = await Project.findById(projectId)
        if (!project) {
            return res.status(400).json({
                msg: 'Project not found'
            })
        }

        if (project.creator.toString() !== req.user.id) {
            return res.status(400).json({
                ok: false,
                msg: 'action not allowed'
            })
        }

        const task = await Task.find({ projectId: projectId })

        res.json({
            ok: true,
            task
        })

    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        })
    }

}


const updateTask = async (req, res) => {

    const { id } = req.params

    try {

        const verifyTask = await Task.findById(id)

        if (!verifyTask) {
            return res.status(400).json({
                msg: 'Task not found'
            })
        }
        const { projectId, name = verifyTask.name, status = verifyTask.status } = req.body
        
        const project = await Project.findById(projectId)

        if (project.creator.toString() !== req.user.id) {
            return res.status(400).json({
                ok: false,
                msg: 'action not allowed'
            })
        }
        
        const newTask = await Task.findByIdAndUpdate(id, { name, status }, { new: true })

        res.json({
            ok: true,
            newTask
        })


    } catch (error) {

        return res.status(400).json({
            ok: false,
            error
        })
    }
}

const deleteTask = async (req, res) => {

    const { id } = req.params

    try {

        const verifyTask = await Task.findById(id)

        if (!verifyTask) {
            return res.status(400).json({
                msg: 'Task not found'
            })
        }

        const { projectId } = req.query

        const project = await Project.findById(projectId)

        if (project.creator.toString() !== req.user.id) {
            return res.status(400).json({
                ok: false,
                msg: 'action not allowed'
            })
        }

        const deleteTask = await Task.findOneAndRemove({_id: id})

        res.json({
            ok: true,
            deleteTask
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            error
        })
    }

}


module.exports = {
    createTasks,
    getTasksByProject,
    updateTask,
    deleteTask
}