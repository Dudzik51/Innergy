export type Year = number;
export type ServiceName = string;
export type Price = number;

export interface ServiceDependency {
    dependantService: ServiceName,
    servicePredecessors: ServiceName[]
}

export interface ServicePrice {
    year: Year,
    serviceName: ServiceName,
    price: Price
}

export interface ServiceDiscount {
    year: Year,
    discountedService: ServiceName,
    config: {
        requiredServices: ServiceName[],
        discount: Price
    }[]
}

export interface ServiceConfig {
    dependencies: ServiceDependency[],
    prices: ServicePrice[],
    discounts: ServiceDiscount[]
}