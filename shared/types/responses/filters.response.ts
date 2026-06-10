import { FormResponse } from "./form.response";
import { GoalResponse } from "./goal.response";
import { ProductTypeResponse } from "./product-type.reponse";

export interface FiltersResponse {
    goals: GoalResponse[];
    forms: FormResponse[];
    productTypes: ProductTypeResponse[];
}
