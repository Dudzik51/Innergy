import { Year, ServiceName, Price } from './interfaces/Aliases';
import { serviceConfig } from './data';
import { ServiceDiscount } from './interfaces/ServiceDiscount';

let ServicesPriceForYear = new Map<Year, Map<ServiceName, Price>>();
let ServiceDependants = new Map<ServiceName, ServiceName[]>();
let ServicePredecessors = new Map<ServiceName, ServiceName[]>();
let ServiceDiscounts: ServiceDiscount[];

export const updateSelectedServices = (
    previouslySelectedServices: ServiceName[],
    action: { type: "Select" | "Deselect"; service: ServiceName }
) => {
    switch (action.type) {
        case "Select":
            const serviceAlreadySelected = previouslySelectedServices.find(service => service == action.service);
            if (serviceAlreadySelected) {
                break;
            }

            const servicePredecessors = ServiceDependants.get(action.service);
            if (servicePredecessors) {
                for (let i = 0; i < servicePredecessors.length; i++) {
                    const isPredecessorOnList = previouslySelectedServices.find(service => service == servicePredecessors[i])
                    if (isPredecessorOnList) {
                        previouslySelectedServices.push(action.service);
                        break;
                    }
                };
            } else {
                previouslySelectedServices.push(action.service);
            }

            break;
        case "Deselect":
            const index = previouslySelectedServices.indexOf(action.service, 0);
            if (index > -1) {
                previouslySelectedServices.splice(index, 1);
            }

            const dependants = ServicePredecessors.get(action.service)?.filter(dependant => previouslySelectedServices.indexOf(dependant) > -1);

            if (dependants) {
                dependants.forEach(dependant => {
                    let hasPredecessor = false;
                    const predecessors = ServiceDependants.get(dependant);

                    for (let i = 0; i < predecessors.length; i++) {
                        if (previouslySelectedServices.indexOf(predecessors[i]) > -1) {
                            hasPredecessor = true;
                            break;
                        }
                    }

                    if (!hasPredecessor) {
                        const index = previouslySelectedServices.indexOf(dependant, 0);
                        previouslySelectedServices.splice(index, 1);
                    }
                })
            }

            break;
    }

    return previouslySelectedServices;
}

export const calculatePrice = (selectedServices: ServiceName[], selectedYear: Year) => {
    const basePrice = selectedServices.reduce((basePrice, service) => {
        return basePrice + ServicesPriceForYear.get(selectedYear).get(service)
    }, 0);

    const finalPrice = basePrice - countDiscount(selectedServices, selectedYear);

    return ({ basePrice: basePrice, finalPrice: finalPrice });
};

function countDiscount(selectedServices: ServiceName[], selectedYear: Year): number {
    const serviceDiscounts = ServiceDiscounts.filter(discount => discount.year == selectedYear);

    if (!serviceDiscounts) {
        return 0;
    }

    let discountPrice = 0;

    for (let i = 0; i < serviceDiscounts.length; i++) {
        let serviceDiscount = serviceDiscounts[i];

        if (selectedServices.indexOf(serviceDiscount.discountedService) == -1) {
            continue;
        }

        for (let j = 0; j < serviceDiscount.config.length; j++) {
            let config = serviceDiscount.config[j];
            let isDiscountValid = false;

            for (let k = 0; k < config.requiredServices.length; k++) {
                if (selectedServices.indexOf(config.requiredServices[k]) > -1) {
                    isDiscountValid = true;
                } else {
                    isDiscountValid = false;
                    break;
                }
            }

            if (isDiscountValid && config.discount > discountPrice) {
                discountPrice += config.discount;
            }
        }
    }

    return discountPrice;
}

export function initConfig() {
    serviceConfig.dependencies.map(dependency => {
        if (!ServiceDependants.has(dependency.dependantService)) {
            ServiceDependants.set(dependency.dependantService, dependency.servicePredecessors);
        }
    });

    serviceConfig.dependencies.map(dependency => {
        dependency.servicePredecessors.forEach(predecessor => {
            if (!ServicePredecessors.has(predecessor)) {
                ServicePredecessors.set(predecessor, new Array<ServiceName>());
            }

            ServicePredecessors.get(predecessor).push(dependency.dependantService);
        })
    });

    serviceConfig.prices.map(config => {
        if (!ServicesPriceForYear.has(config.year)) {
            ServicesPriceForYear.set(config.year, new Map<ServiceName, Price>());
        }

        if (!ServicesPriceForYear.get(config.year).has(config.serviceName)) {
            ServicesPriceForYear.get(config.year).set(config.serviceName, config.price);
        }
    });

    ServiceDiscounts = serviceConfig.discounts;
}

initConfig();