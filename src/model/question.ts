import mongoose from "mongoose"

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    parent: {
        required: false,
        type: String
    },
})

const QuestionModel = mongoose.model('question', dataSchema)

export default QuestionModel 