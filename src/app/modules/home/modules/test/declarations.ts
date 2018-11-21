import { PageComponent } from './components/page/page.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ResultQuestionComponent } from './components/result-question/result-question.component';
import { StartComponent } from './components/start/start.component';
import { TestsComponent } from './components/tests/tests.component';
import { TimerComponent } from './components/timer/timer.component';
import { TestComponent } from './components/test/test.component';
import { ValuationComponent } from './components/valuation/valuation.component';
import { WrongQuestionComponent } from './components/wrong-question/wrong-question.component';
import { WrongQuestionsComponent } from './components/wrong-questions/wrong-questions.component';
import { NotCopiableDirective } from './directives/not-copiable.directive';
import { WrongQuestionsPipe } from './pipes/wrong-questions.pipe';

export const components=[
	PageComponent,
	QuestionComponent,
	QuestionsComponent,
	ResultQuestionComponent,
	StartComponent,
	TimerComponent,
	TestComponent,
	TestsComponent,
	ValuationComponent,
	WrongQuestionComponent,
	WrongQuestionsComponent
]

export const directives = [
	NotCopiableDirective
]

export const pipes = [
	WrongQuestionsPipe
]