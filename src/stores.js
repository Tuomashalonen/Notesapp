// stores.js

import { writable } from 'svelte/store';

export const notes = writable([]);
export const selectedNote = writable(null);
export const selectedCourse = writable(null);
export const sessionCourses = writable([]);
export const isCourseLocked = writable(false);

export const courses = writable([]);

// Exporttaa funktio, joka lisää kurssin
export const lockCourse = () => {
  isCourseLocked.set(true);
};
