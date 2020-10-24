export default interface ICreateBudgetDTO {
    name: string;
    dev_quantity: number;
    designer_quantity: number;
    sm_quantity: number;
    po_quantity: number;
    min_days: number;
    owner_id: string;
}
