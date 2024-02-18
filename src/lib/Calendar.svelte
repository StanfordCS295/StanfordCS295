<!-- Generates a calendar from the lecture data in the yaml -->

<script lang="ts">
  import Day from './Calendar/Day.svelte';
  import Assignments from './Calendar/Day/Assignments.svelte';
  import Topic from './Calendar/Day/Topic.svelte';

  import { class_data, lectures } from './classData';

  const weekdays = class_data.class_days.length;
</script>

<div class="calendar">
  {#each lectures as lecture, j}
    {#if lecture.top}
      <Day date="Date" header>
        <Topic>Topic</Topic>
        <Assignments>Due Dates</Assignments>
      </Day>
    {:else if lecture.unit}
      <Day date="" header>
        <Topic>{lecture.topic}</Topic>
      </Day>
    {:else}
      <Day date={lecture.date} holiday={!!lecture.holiday} even={j % 2 == 0}>
        <Topic>{lecture.topic}</Topic>
        {#if lecture.assignments}
          <Assignments><a href={lecture.url}>{lecture.assignments}</a></Assignments>
        {/if}
      </Day>
    {/if}
  {/each}
</div>

<style>
  .calendar {
    font-size: 0.9em;
    margin-bottom: 3em;
  }
</style>
