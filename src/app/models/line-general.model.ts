export interface LineGeneral {
    id: number;
    title: string;
    actualProduction: number;
    targetProduction: number;
    lastHourOee: number;
    lastHourCycleTime: number;
    updatedAt: string | null;
    labels: string[];
    oeeValues: (number | null)[];
    status: string;
    actualCycleTime: (number | null)[];
    targetCycleTime: (number | null)[];
    factoryId: number;
}
