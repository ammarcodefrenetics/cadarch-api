import mongoose from 'mongoose';
import { QuestionOptionInterface } from './questionOptionModel';

interface QuestionInterface {
    _id:string
    userId: number;
    title: string;
    details: string;
    isBasic: boolean;
    isDeleted: boolean;
    isDependent: boolean;
    displayOrder: number;
    createdBy: number;
    updatedBy: number;
    // questionOptions: [];
}
export interface QuestionViewInterface {
    userId: number;
    title: string;
    details: string;
    isBasic: boolean;
    isDeleted: boolean;
    isDependent: boolean;
    displayOrder: number;
    createdBy: number;
    updatedBy: number;
    // questionOptions?: Array<QuestionOptionInterface>;
}
const QuestionSchema = new mongoose.Schema({
    userId: {
        type: Number,
        allowNull: true
    },
    title: {
        type: String,
        allowNull: true
    },
    details: {
        type: String,
        allowNull: true
    },
    isBasic: {
        type: Boolean,
        allowNull: true
    },
    displayOrder: {
        type: Number,
        allowNull: true
    },
    isDeleted: {
        type: Boolean,
        allowNull: true,
        default: false
    },
    isDependent: {
        type: Boolean,
        allowNull: true,
        default: false
    },
    CreatedBy: {
        type: Number,
        allowNull: true
    },
    UpdatedBy: {
        type: Number,
        allowNull: true
    }
},
    { timestamps: { createdAt: true, updatedAt: true } }
);

const Question = mongoose.model('Question', QuestionSchema);

export { QuestionInterface, Question };