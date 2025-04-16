import {Injectable} from '@angular/core';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';

@Injectable({
    providedIn: 'root'
})
export class IconService {
    private iconMap: Map<string, IconDefinition> = new Map();

    // ✔ Tek ikon kaydet
    public registerIcon(name: string, icon: IconDefinition): void {
        this.iconMap.set(name, icon);
    }

    // ✔ Çoklu ikon kaydet
    public registerIcons(icons: Record<string, IconDefinition>): void {
        Object.entries(icons).forEach(([name, icon]) =>
            this.registerIcon(name, icon)
        );
    }

    // ✔ İkon getir, yoksa fallback dön
    public getIcon(name: string): IconDefinition {
        return this.iconMap.get(name) ?? this.iconMap.get('faBan')!; // fallback: faBan
    }
}
