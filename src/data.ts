import { ServiceConfig } from "./interfaces/ServicesInterfaces";

export const serviceConfig: ServiceConfig = {
    dependencies: [
        {
            dependantService: "BlurayPackage",
            servicePredecessors: ["VideoRecording"]
        },
        {
            dependantService: "TwoDayEvent",
            servicePredecessors: ["Photography", "VideoRecording"]
        }
    ],
    prices: [
        {
            serviceName: "WeddingSession",
            year: 2020,
            price: 600
        },
        {
            serviceName: "WeddingSession",
            year: 2021,
            price: 600
        },
        {
            serviceName: "WeddingSession",
            year: 2022,
            price: 600
        },
        {
            serviceName: "Photography",
            year: 2020,
            price: 1700
        },
        {
            serviceName: "Photography",
            year: 2021,
            price: 1800
        },
        {
            serviceName: "Photography",
            year: 2022,
            price: 1900
        },
        {
            serviceName: "VideoRecording",
            year: 2020,
            price: 1700
        },
        {
            serviceName: "VideoRecording",
            year: 2021,
            price: 1800
        },
        {
            serviceName: "VideoRecording",
            year: 2022,
            price: 1900
        },
        {
            serviceName: "TwoDayEvent",
            year: 2020,
            price: 400
        },
        {
            serviceName: "TwoDayEvent",
            year: 2021,
            price: 400
        },
        {
            serviceName: "TwoDayEvent",
            year: 2022,
            price: 400
        },
        {
            serviceName: "BlurayPackage",
            year: 2020,
            price: 300
        },
        {
            serviceName: "BlurayPackage",
            year: 2021,
            price: 300
        },
        {
            serviceName: "BlurayPackage",
            year: 2022,
            price: 300
        }
    ],
    discounts: [
        {
            year: 2020,
            discountedService: "WeddingSession",
            config: [{
                requiredServices: ["Photography"],
                discount: 300
            }, {
                requiredServices: ["VideoRecording"],
                discount: 300
            }]
        }, {
            year: 2021,
            discountedService: "WeddingSession",
            config: [{
                requiredServices: ["Photography"],
                discount: 300
            }, {
                requiredServices: ["VideoRecording"],
                discount: 300
            }]
        }, {
            year: 2022,
            discountedService: "WeddingSession",
            config: [{
                requiredServices: ["Photography"],
                discount: 600
            }, {
                requiredServices: ["VideoRecording"],
                discount: 300
            }]
        }, {
            year: 2020,
            discountedService: "VideoRecording",
            config: [{
                requiredServices: ["Photography"],
                discount: 1200
            }]
        }, {
            year: 2021,
            discountedService: "VideoRecording",
            config: [{
                requiredServices: ["Photography"],
                discount: 1300
            }]
        }, {
            year: 2022,
            discountedService: "VideoRecording",
            config: [{
                requiredServices: ["Photography"],
                discount: 1300
            }]
        }
    ]
}
