<!-- CourseList.svelte -->
<script>
  import { onMount } from 'svelte';
  import { getCourses, getNotes } from '../services';
  import { courses, selectedCourse, isCourseLocked } from '../stores';

  onMount(async () => {
    try {
      const fetchedCourses = await getCourses();
      courses.set(fetchedCourses);
    } catch (error) {
      console.error('Virhe Datan keräyksessä:', error);
    }
  });

  // jos kurssi on lukittu, valittu kurssi on sama kuin valittu kurssi
  $: {
    if ($isCourseLocked) {
      $selectedCourse = $selectedCourse;
    }
  }
</script>

<style>
  h2 {
    font-size: 25px;
    color: #333;
    margin-bottom: 5px;
  }

  select {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
  }

  option {
    padding: 15px;
  }
</style>

<div>
  <h2>Opintojaksot</h2>
  {#if $courses.length > 0}
    <select bind:value={$selectedCourse} disabled={$isCourseLocked} aria-label="Valitse opintojakso">
      <option value={null}>Kaikki opintojaksot</option>
      {#each $courses as course (course.id)}
        <option value={course}>{course.name}</option>
      {/each}
    </select>
  {:else}
    <p>Ei opintojaksoja.</p>
  {/if}
</div>
