import { BaseModel } from "./base-model";

export interface Employee extends BaseModel {
    empId?: string;
    name?: string;
}
