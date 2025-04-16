import { Pipe, PipeTransform, Inject, LOCALE_ID, Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
    name: 'customDate',
    standalone: false
  })
  @Injectable({
    providedIn: 'root'
  })

export class CustomDatePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  private turkceAyKisaltmalari: { [key: string]: string } = {
    'Ocak': 'Oca.',
    'Şubat': 'Şub.',
    'Mart': 'Mar.',
    'Nisan': 'Nis.',
    'Mayıs': 'May.',
    'Haziran': 'Haz.',
    'Temmuz': 'Tem.',
    'Ağustos': 'Ağu.',
    'Eylül': 'Eyl.',
    'Ekim': 'Eki.',
    'Kasım': 'Kas.',
    'Aralık': 'Ara.'
  };

  transform(value: string | Date): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) return String(value);

    const gun = formatDate(date, 'dd', this.locale);
    const saat = formatDate(date, 'HH', this.locale);

    const ayTam = formatDate(date, 'LLLL', this.locale);
    const ayKisa = this.locale.startsWith('tr')
      ? this.turkceAyKisaltmalari[ayTam] || ayTam
      : formatDate(date, 'MMM', this.locale);

    return `${gun} ${ayKisa} ${saat}`;
  }
}
