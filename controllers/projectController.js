const { validationResult } = require("express-validator")
const Project = require("../models/Project")


const createProject = async (req, res) => {

    // validate info from body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {

        // info from body
        const project = new Project(req.body)

        // info from Middleware [Token]
        project.creator = req.user.id

        // save in DB
        await project.save()

        res.json({
            ok: true,
            project
        })

    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        })
    }

}

const getProjects = async (req, res) => {

    try {

        const projects = await Project.find({ creator: req.user.id })

        res.json({
            ok: true,
            projects
        })

    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        })
    }

}

const updateProject = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {

        const id = req.params.id

        const projectExist = await Project.findById(id);
        if (!projectExist) {
            return res.status(404).json({
                ok: false,
                msg: 'Project not found'
            })
        }

        if (projectExist.creator.toString() !== req.user.id) {
            return res.status(401).json({
                ok: false,
                msg: 'action not allowed'
            })
        }

        const newProject = await Project.findByIdAndUpdate(id, req.body, { new: true })

        res.json({
            ok: true,
            newProject
        })

    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        })
    }


}

const deleteProject = async (req, res) => {

    try {

        const projectExist = await Project.findById(req.params.id)

        if (!projectExist) {
            return res.status(404).json({
                ok: false,
                msg: 'Project not found'
            })
        }

        if (projectExist.creator.toString() !== req.user.id) {
            return res.status(401).json({
                ok: false,
                msg: 'action not allowed'
            })
        }

        const deleteProject = await Project.findOneAndRemove({ _id: req.params.id })

        res.json({
            ok: true,
            deleteProject
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg:'project could not be deleted'
        })
    }

}


module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject
}