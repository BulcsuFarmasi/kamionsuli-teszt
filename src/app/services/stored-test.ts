import { Test } from './test.service'
import { Page } from './page'

export class StoredTest extends Test {
    currentPage:number;
    pages:Page[]
}
