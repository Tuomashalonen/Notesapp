<!-- App.svelte -->
<script>
	import AddNote from './components/AddNote.svelte';
	import CourseList from './components/CourseList.svelte';
	import NoteList from './components/NoteList.svelte';
  
	export let selectedCourse;
	export let courses;
	export let selectedNote;
	export let notes;
  </script>
  
  <style>
	main {
		display: flex;
		justify-content: space-around;
		align-items: first baseline;
		padding: 20px;
		background-color: #f8f8f8;
	}



	h2 {
		font-size: 20px;
		color: #333;
		margin-bottom: 10px;
	}


</style>
  
  <main>


	
	<AddNote {selectedCourse} />
	<CourseList {courses} />
    <NoteList {notes} />

  </main>
  