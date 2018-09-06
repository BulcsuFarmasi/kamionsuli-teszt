import { Test } from './test'
import { Page } from './page'

export class StoredTest extends Test {
    currentPage:number;
    pages:Page[]
}
