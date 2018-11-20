import { TestComponent } from "./test.component";

describe('TestComponent', () => {
    let testComponent:TestComponent

    beforeEach(() => {
        testComponent = new TestComponent(null, null);
    })

    describe('onGoToWrongQuestion', () => {
        it('should set current state with the parameter', () => {
            let state = 'wrong questions';
            
            testComponent.onGoToWrongQuestions(state);

            expect(testComponent.currentState).toBe(state);
        })
    })
})