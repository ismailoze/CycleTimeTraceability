import {IconDefinition} from '@fortawesome/fontawesome-svg-core';

export interface LineState {
    id: number;
    title: string;
    iconContent: string; // API'den gelen ikon adı
    iconDef: IconDefinition; // Angular bileşende kullanılacak gerçek ikon objesi
    quantity: number;
    variant: string;
    factoryId: number;
}
