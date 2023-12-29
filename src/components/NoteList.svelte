<!-- NoteList.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { getNotes } from '../services';
  import { notes, selectedNote, selectedCourse } from '../stores';

  let filteredNotes = [];

  //Subscribe muutokset notes, selectedNote ja selectedCourse
  $: console.log('Muistiinpano päivitetty:', $notes);
  $: console.log('Valittu muistiinpano:', $selectedNote);
  $: console.log('Valittu kurssi:', $selectedCourse);

  $: filteredNotes = $notes.filter((note) => {
    return !$selectedCourse || ($selectedCourse && note.course && $selectedCourse.id === note.course.id);
  });

  // onMount-funktio hakee muistiinpanot API:sta
  onMount(() => {
    selectedNote.set(null);
    console.log('Alku muistiinpanot:', $notes);
    fetchAllNotesFromApi();
  });

  onDestroy(() => {
    // Unsubscribe muistiinpanojen päivityksistä
    // ...
  });

  const fetchAllNotesFromApi = async () => {
    try {
      const apiNotes = await getNotes();
      
      // Tallenna muistiinpanot local storageen
      localStorage.setItem('notes', JSON.stringify(apiNotes));

      // Päivitä notes-store
      notes.set(apiNotes);
      console.log('Muistiinpano filtteri:', filteredNotes);
    } catch (error) {
      console.error('Virhe apin kanssa:', error);
    }
  };

  const deleteNote = (id) => {
    notes.update((prevNotes) => prevNotes.filter((note) => note.id !== id));
    selectedNote.set(null); // Tyhjennä valittu note poistamisen jälkeen
  };
</script>

<style>
  div {
    margin: 20px;
  }

  h2 {
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
  }

  li:hover {
    background-color: #f5f5f5;
  }

  p {
    font-style: italic;
    color: #888;
  }

  button {
    background-color: #f000a8;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  button:hover {
    background-color: #d5007e;
  }
</style>

<div>
  <h2>Muistiinpanot:</h2>
  {#if filteredNotes.length > 0}
    <ul>
      {#each filteredNotes as note (note.id)}
        <li>
          <span>{note.text} ({note.course ? note.course.name : 'Opintojakso ei valittu'}, {note.timestamp})</span>
          <button on:click={() => deleteNote(note.id)}>Poista</button>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Ei Muistiinpanoja.</p>
  {/if}
</div>
