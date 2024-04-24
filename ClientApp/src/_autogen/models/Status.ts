export enum Status {
    NEW = 1,
    PROCESSING = 2,
    PROCESSED = 3,
    DELETED = 4,
}

export enum StringStatus {
    NEW = "NEW",
    PROCESSING = "PROCESSING",
    PROCESSED = "PROCESSED",
    DELETED = "DELETED",
}

export const  valueKeyArrayStatus = {
        "1": "NEW",
        "2": "PROCESSING",
        "3": "PROCESSED",
        "4": "DELETED",
}

export const  objKeyValueStatus = {
        "NEW": "1",
        "PROCESSING": "2",
        "PROCESSED": "3",
        "DELETED": "4",
}

export const parsedStatus = [
        {"text": "NEW", "value": 1},
        {"text": "PROCESSING", "value": 2},
        {"text": "PROCESSED", "value": 3},
        {"text": "DELETED", "value": 4},
];