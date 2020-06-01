import { ServiceDependency } from "./ServiceDependency";
import { ServicePrice } from "./ServicePrice";
import { ServiceDiscount } from "./ServiceDiscount";

export interface ServiceConfig {
    dependencies: ServiceDependency[],
    prices: ServicePrice[],
    discounts: ServiceDiscount[]
}