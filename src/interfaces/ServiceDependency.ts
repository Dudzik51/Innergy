import { ServiceName } from "./Aliases";

export interface ServiceDependency {
    dependantService: ServiceName,
    servicePredecessors: ServiceName[]
}