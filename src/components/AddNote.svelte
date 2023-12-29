<!-- AddNote.svelte -->
<script>
  import { onMount } from 'svelte';
  import { notes, selectedCourse, sessionCourses, isCourseLocked, selectedNote } from '../stores';

  let newNoteText = '';
  let errorMessage = ''; // Uusi muuttuja virheviesteille
  let isFirstNote = false; // Uusi muuttuja ensimmäisen muistiinpanon tarkistamiseen

  const addNote = () => {
    // tarkista onko kurssi lukittu
    if ($isCourseLocked) {
      addNoteToCurrentCourse();
    } else {
      // tarkista onko valittu kurssi
      if (!$selectedCourse || !newNoteText.trim()) {
        errorMessage = 'Valitse opintojakso ennen muistiinpanon lisäämistä.';
        return;
      }

      // Nollaa virheviesti onnistuneen lisäyksen jälkeen
      errorMessage = '';

      // luo uusi muistiinpano
      const newNote = {
        id: Date.now(),
        text: newNoteText,
        timestamp: new Date().toLocaleString(),
        course: {
          id: $selectedCourse.id,
          name: $selectedCourse.name,
        },
      };

      // päivittää notes ja sessionCourses
      notes.update((prevNotes) => [...prevNotes, newNote]);
      sessionCourses.update((prevCourses) => [...prevCourses, $selectedCourse]);
      selectedNote.set(newNote);

      // lukitsee kurssin
      isCourseLocked.set(true);

      // asettaa ensimmäisen muistiinpanon arvoksi true
      selectedCourse.set($selectedCourse);

      // asettaa ensimmäisen muistiinpanon arvoksi true
      isFirstNote = true;

      newNoteText = '';
    }
  };

  const addNoteToCurrentCourse = () => {
    // tarkista onko valittu kurssi
    if (!$selectedCourse) {
      errorMessage = 'Valitse opintojakso ennen muistiinpanon lisäämistä.';
      return;
    }

    // tarvitaan virheviesti
    if (!newNoteText.trim()) {
      errorMessage = 'Muistiinpano ei voi olla tyhjä.';
      return;
    }

    // nollaa virheviesti onnistuneen lisäyksen jälkeen
    errorMessage = '';

    // luo uusi muistiinpano
    const newNote = {
      id: Date.now(),
      text: newNoteText,
      timestamp: new Date().toLocaleString(),
      course: {
        id: $selectedCourse.id,
        name: $selectedCourse.name,
      },
    };

    // päivittää notes ja sessionCourses
    notes.update((prevNotes) => [...prevNotes, newNote]);
    sessionCourses.update((prevCourses) => [...prevCourses, $selectedCourse]);
    selectedNote.set(newNote);

    newNoteText = '';
  };

  // Subscribe valittuun kurssiin
  $: console.log('Valittu opintojakso:', $selectedCourse);
  $: console.log('Kursis on lukittu:', $isCourseLocked);

  // määrää onko kurssi lukittu
  const endSession = () => {
    // tyhjentää valitun kurssin ja lukitsee kurssin
    selectedCourse.set(null);
    isCourseLocked.set(false);

    // tyhneentää sessionCourses
    sessionCourses.set([]);
  };

  onMount(() => {
    // nollaa sessionCourses ja isCourseLocked
    sessionCourses.set([]);
    isCourseLocked.set(false);
  });
</script>

<style>
  div {
    margin-top: 20px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  button {
    background-color: hsla(320, 78%, 48%, 0.356);
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #f000a8;
  }

  .error-message {
    color: #ff0000;
    margin-bottom: 10px;
    border: 1px solid #ff0000;
    border-radius: 4px;
    padding: 10px;
    background-color: #ffebee;
  }
</style>

<div>
  {#if errorMessage}
    <div class="error-message">{errorMessage}</div>
  {/if}

  <h2>Lisää muistiinpano</h2>
  <input type="text" aria-label="Kirjoita muistiinpano tähän" bind:value={newNoteText} />
  <button on:click={addNote} aria-label="Tallenna">Tallenna muistiinpano</button>

  {#if isFirstNote}
    <button class="end-session-button" on:click={endSession} aria-label="Lopeta sessio painamalla tästä">Lopeta sessio</button>
  {/if}
</div>
