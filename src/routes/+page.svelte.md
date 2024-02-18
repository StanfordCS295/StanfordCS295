---
title: 'CS 295'
---

<script lang="ts">
  import { base } from '$app/paths';
  import Calendar from '$lib/Calendar.svelte';
  import { class_data, fixupLink } from '$lib/classData';

  import Instructor from '$lib/Instructor.svelte';
  import Callout from '$lib/Callout.svelte';
</script>

# CS 295: Software Engineering

## Course Description

This course focuses on software specification, testing and verification. The emphasis is on automated tools for developing reliable software. The course covers material---drawn primarily from recent research papers---on the technology underlying these tools. Assignments supplement the lectures with hands-on experience in using these tools and customizing them for solving new problems. The course is appropriate for students intending to pursue research in program analysis and verification. It is also suitable for those who wish to add the use of advanced software tools to their skill set. 

For more information about lecture recordings, the reading materials referenced below, and additional class infomation, visit the [Canvas](https://canvas.stanford.edu/courses/182800) page.

## Basic Information

Time: Wednesdays and Fridays 1:30 PM - 2:20 PM<br>
Location: Gates B12 <br>
Instructor: [Sara Achour](https://www.sara-achour.me/)

## Calendar
<Calendar />

## Grading
All students would be expected to:
- Complete three assignments: **30%**
- Submit a project proposal: **15%**
- Complete a self-selected final project: **25%**
- Attend Lectures: (**1.5%** per lecture)


## Course Staff

<div style="display: flex; flex-wrap: wrap;">
	{#each class_data.instructors as instructor}
		<Instructor
			src={fixupLink(instructor.image)}
			name={instructor.name}
			role={instructor.role}
			email={instructor.email}
			officeHours={instructor.officeHours}
		/>
	{/each}
</div>

## Attributions

This website is based off [Stanford CS45](https://github.com/stanford-cs45/stanford-cs45.github.io).