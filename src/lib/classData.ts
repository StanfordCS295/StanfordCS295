/**
 * Exports typed class data and utilities to help use it when
 * rendering other pages
 */
import { base } from '$app/paths';
import class_data_raw from '../class/class_data.yaml';
import moment from 'moment';

// === Data ===
export const class_data = class_data_raw as ClassData;
export const lectures = getLectureDataByWeek();

/** Sorts lecture data into a list-of-lists, sorting lectures into weeks. */
function getLectureDataByWeek() {
  return class_data.lectures;
}

// === Helper Functions ===

/** Title cases a given string */
export function titleCase(s: string): string {
  return s.replace(/(?:^| )\w/g, (substring) => substring.toUpperCase());
}

// Gets the week of a given lexture number.
export function getWeek(lectureNumber: number) {
  return Math.floor(lectureNumber / class_data.class_days.length);
}

// Gets a Moment object for the given lecture number.
export function getLectureMoment(lectureNumber: number) {
  const startDate = moment(class_data.start_date, 'YYYY/MM/DD', true)
    .isoWeekday(class_data.class_days[0])
    .hour(0)
    .minute(0)
    .second(0);
  const weekIdx = getWeek(lectureNumber);
  const weekday = class_data.class_days[lectureNumber % class_data.class_days.length];

  return startDate.add(weekIdx, 'weeks').isoWeekday(weekday);
}


// Gets the box color for a particular material
export function getBoxColor(type: string) {
  switch (type) {
    case 'slides':
      return 'blue';
    case 'notes':
      return 'black';
    case 'lecture video':
      return 'purple';
    default:
      return 'red';
  }
}

// Fixes up absolute links with the base if necessary.
export function fixupLink(baseLink: string) {
  if (baseLink.startsWith('/') && !baseLink.startsWith('//')) {
    return `${base}${baseLink}`;
  }
  return baseLink;
}

/** Determines if the url is absolute and returns whether or not to open in a new window (yes for external) */
export function getTarget(url: string) {
  return url.startsWith('http') || url.startsWith('//') ? '_blank' : '_self';
}

// === Types ===
export type Weekday =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';
export interface ClassData {
  start_date: string;
  class_days: Weekday[];
  assignment_due_time: string;
  instructors: Instructor[];
  assignments: Assignment[];
  lectures: Lecture[];
}

export interface Instructor {
  name: string;
  image: string;
  role?: string;
  email?: string;
  officeHours: OfficeHour[];
}

export interface OfficeHour {
  when: string;
  where: string;
  url?: string;
}

export interface Assignment {
  name: string;
  points: number;
  due: string;
  materials?: Record<string, string>;
  details?: string;
  url?: string;
}

export interface Lecture {
  topic: string;
  materials?: Record<string, string>;
  details?: string;
  assignments?: string;
  holiday?: boolean;
  date?: string;
  top?: boolean;
  unit?: boolean;
}
