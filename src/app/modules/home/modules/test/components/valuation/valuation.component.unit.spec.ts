import { ValuationComponent } from "./valuation.component";

describe('ValuationComponent', () => {
    
    let valuationComponent:ValuationComponent;
    
    beforeEach(() => {
        valuationComponent = new ValuationComponent(null, null, null);
    })
    
    describe('onGoToWrongQuestions', () => {
        it('should raise onGoToWrongQuestions when go to wrong questions', () => {
            let wrongQuestions:string
            valuationComponent.onGoToWrongQuestions.subscribe(wq => wrongQuestions = wq);

            valuationComponent.goToWrongQuestions();

            expect(wrongQuestions).toBe('wrong questions')
        })
    })
})