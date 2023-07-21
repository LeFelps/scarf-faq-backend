import express from "express";
import { Question } from "../../types.js";
import QuestionModel from "../model/question";

const router = express.Router();

function formatQuestions(sections: Question[], subsections: Question[]) {
    sections.map(question => {
        let followUp = subsections.filter(sq => sq.parent === question._id.valueOf())
        formatQuestions(followUp, subsections)
        question.children = followUp
    })
}

router.get('/', async (req, res) => {
    try {
        const data: Question[] = await QuestionModel.find();

        if (req.query?.flattened) {
            res.json(data)
            return
        };

        let sections: Question[] = []
        let subsections: Question[] = []

        function getQuestionData(question: Question) {
            return {
                _id: question._id,
                title: question.title,
                description: question.description,
                parent: question.parent,
                __v: question.__v
            }
        }

        data.map((question: Question) => {
            question.parent == null ?
                sections.push(getQuestionData(question))
                : subsections.push(getQuestionData(question))
        })

        formatQuestions(sections, subsections)

        res.json(sections)
    }
    catch (error) {
        let message;
        
        if (error instanceof Error) message = error.message;
        else message = String(error)

        res.status(500).json(message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const data = await QuestionModel.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        let message;
        
        if (error instanceof Error) message = error.message;
        else message = String(error)

        res.status(500).json(message)
    }
})


router.post('/', async (req, res) => {
    const data = new QuestionModel({
        title: req.body.title,
        description: req.body.description,
        parent: req.body.parent,
    })

    try {
        const dataToSave = await data.save();
        console.log(dataToSave)
        res.status(200).json(dataToSave)
    }
    catch (error) {
        let message;
        
        if (error instanceof Error) message = error.message;
        else message = String(error)

        res.status(500).json(message)
    }
})

router.patch('/', async (req, res) => {
    try {
        const id = req.body.id;
        const updatedData = req.body;
        const options = { new: true };

        if (!id) throw new Error('Cannot update question; Missing id');

        const result = await QuestionModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        let message;

        if (error instanceof Error) message = error.message;
        else message = String(error)

        res.status(500).json(message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const dependencies = await QuestionModel.find({ parent: id }).exec()

        if (dependencies.length > 0) throw new Error('Question has dependencies.')

        const data = await QuestionModel.findByIdAndDelete(id)
        res.send(`Question has been deleted.`)
    }
    catch (error) {
        let message;
        
        if (error instanceof Error) message = error.message;
        else message = String(error)

        res.status(500).json(message)
    }
})

export default router