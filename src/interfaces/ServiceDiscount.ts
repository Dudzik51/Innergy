import { Year, ServiceName, Price } from "./Aliases";

export interface ServiceDiscount {
    year: Year,
    discountedService: ServiceName,
    config: {
        requiredServices: ServiceName[],
        discount: Price
    }[]
}