// services.js


// exporttaa async funktio getCourses() { APIsta
export async function getCourses() {
  try {
    const response = await fetch('https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses', {
      mode: 'cors',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}

// exporttaa async funktio getNotes() { APIsta
export async function getNotes() {
  try {
    const response = await fetch('https://luentomuistiinpano-api.netlify.app/.netlify/functions/notes', {
      mode: 'cors',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
}
