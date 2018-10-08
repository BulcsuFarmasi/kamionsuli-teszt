import { GroupType } from "./group-type";

export interface Group {
    id:number;
    name:string;
    accessFrom:Date;
    accessTo:Date;
    type:GroupType;
}