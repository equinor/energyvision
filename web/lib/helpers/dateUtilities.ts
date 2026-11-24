import { tz } from '@date-fns/tz';
import { TZDate } from '@date-fns/tz/date';
import { format } from 'date-fns';
import {
  cy,
  de,
  enGB,
  es,
  ja,
  ko,
  type Locale,
  nb,
  pl,
  ptBR,
} from 'date-fns/locale';
import type { EventDate } from '@/templates/event/Event';

const NORWEGIAN_TIME_ZONE = 'Europe/Oslo';

/** Maps a site locale (ISO, e.g. "nb-NO") to its date-fns locale. Falls back to en-GB. */
export const getDateFnsLocale = (locale: string): Locale => {
  switch (locale) {
    case 'nb-NO':
      return nb;
    case 'pt-BR':
      return ptBR;
    case 'pl-PL':
      return pl;
    case 'cy-CY':
      return cy;
    case 'ja-JP':
      return ja;
    case 'ko-KR':
      return ko;
    case 'de-DE':
      return de;
    case 'es-AR':
      return es;
    default:
      return enGB;
  }
};

/**
 * Formats a date and time in Norwegian time followed by the CET/CEST abbreviation,
 * with the month abbreviated the way the locale writes it, e.g. "19 Nov 2026 09:25 CET"
 * or "19. nov. 2026 09:25 CET". The time zone is fixed, so the output is the same on
 * the server and in every browser.
 */
export const formatDateTimeInNorwegianTime = (
  datetime: string | Date,
  locale: string,
) => {
  const date = new Date(datetime);
  if (Number.isNaN(date.getTime())) return undefined;

  // en-GB gives CET/CEST for every site locale (e.g. de-DE would give MEZ, ja-JP GMT+1)
  const timeZoneName =
    new Intl.DateTimeFormat('en-GB', {
      timeZone: NORWEGIAN_TIME_ZONE,
      timeZoneName: 'short',
    })
      .formatToParts(date)
      .find((part) => part.type === 'timeZoneName')?.value ?? '';

  return `${format(date, 'PP p', {
    in: tz(NORWEGIAN_TIME_ZONE),
    locale: getDateFnsLocale(locale),
  })} ${timeZoneName}`.trim();
};

const parseDateParts = (date: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return null;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const reference = new Date(Date.UTC(year, month - 1, day));
  if (
    reference.getUTCFullYear() !== year ||
    reference.getUTCMonth() !== month - 1 ||
    reference.getUTCDate() !== day
  ) {
    return null;
  }

  return { year, month, day };
};

const parseTimeParts = (time: string) => {
  const match = /^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(time);
  if (!match) return null;

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const second = Number(match[3] ?? 0);

  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    !Number.isInteger(second)
  ) {
    return null;
  }

  if (
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59 ||
    second < 0 ||
    second > 59
  ) {
    return null;
  }

  return { hour, minute, second };
};

export const getEventDates = (eventDate: EventDate | undefined) => {
  let start: string | undefined;
  let end: string | undefined;

  if (!eventDate) {
    return { start, end };
  }
  const { date, startTime, endTime } = eventDate;
  if (!date) return { start, end };

  const parsedDate = parseDateParts(date);
  if (!parsedDate) return { start, end };

  if (startTime) {
    const parsedStartTime = parseTimeParts(startTime);
    if (!parsedStartTime) return { start, end };

    const { year, month, day } = parsedDate;
    const {
      hour: startHour,
      minute: startMinute,
      second: startSecond,
    } = parsedStartTime;

    const startCET = new TZDate(
      year,
      month - 1,
      day,
      startHour,
      startMinute,
      startSecond,
      0,
      'Europe/Oslo',
    );

    // Get browser's timezone string automatically
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const startDateTime = startCET.withTimeZone(browserTimeZone ?? 'UTC');
    start = startDateTime.toISOString();

    if (endTime) {
      const parsedEndTime = parseTimeParts(endTime);
      if (!parsedEndTime) return { start, end };

      const {
        hour: endHour,
        minute: endMinute,
        second: endSecond,
      } = parsedEndTime;

      const endCET = new TZDate(
        year,
        month - 1,
        day,
        endHour,
        endMinute,
        endSecond,
        0,
        'Europe/Oslo',
      );
      const endDateTime = endCET.withTimeZone(browserTimeZone ?? 'UTC');
      end = endDateTime.toISOString();
    }
  }
  return { start, end };
};

export const isDateAfter = (a: string, b: string) => {
  const dtA = new Date(a).getTime();
  const dtB = new Date(b).getTime();

  return dtA > dtB;
};
