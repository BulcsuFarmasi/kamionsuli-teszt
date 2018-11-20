import { QuestionService } from "./question.service";
import { Question } from "../models/question";

describe('UserService', () => {
    let questionService
    
    beforeEach(() => {
        questionService = new QuestionService(null);
    })

    describe('findAnsweredCorrectly', () => {
        it ('should set answeredCorrectly to false if question was answered wrong', () => {
            let questions:Question[] = [{
                id: 1,
                text: '',
                type: '',
                answers: [
                    {
                        id: 1,
                        text: '',
                        correct:false,
                        marked: true
                    },
                    {
                        id: 2,
                        text: '',
                        correct: true
                    },
                ],
                images: []
            }]

            questions = questionService.findAnsweredCorrectly(questions);

            expect(questions[0].answeredCorrectly).toBeFalsy();
        })
    });

    describe('findAnsweredCorrectly', () => {
        it ('should set answeredCorrectly to true if question was answered correctly', () => {
            let questions:Question[] = [{
                id: 1,
                text: '',
                type: '',
                answers: [
                    {
                        id: 1,
                        text: '',
                        correct: true,
                        marked: true
                    },
                    {
                        id: 2,
                        text: '',
                        correct: false
                    },
                ],
                images: []
            }]

            questions = questionService.findAnsweredCorrectly(questions);

            expect(questions[0].answeredCorrectly).toBeTruthy();
        })
    });

    it('should randomize questions', () => {
        const questions = [
            {
                id: 1,
                text: '',
                type: '',
                images: []
            },
            {
                id: 2,
                text: '',
                type: '',
                images: []
            },
            {
                id: 3,
                text: '',
                type: '',
                images: []
            }
        ]

        const randomizedQuestions = questionService.randomizeQuestions(questions);
        expect(randomizedQuestions[0]).not.toBe(questions[0]);
    })
})