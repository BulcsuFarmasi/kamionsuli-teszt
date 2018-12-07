import { GroupType } from "./group-type";

export interface Note {
    id:number;
    title:string;
    path:string;
    groupType:GroupType;
    checked:boolean;
}