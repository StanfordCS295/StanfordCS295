<!-- NavBar shown at the top of all pages -->
<script>
  import { base, edstem, canvas } from '$lib/constants';
  import NavbarBase from '$lib/Navbar/NavbarBase.svelte';
  import NavList from '$lib/Navbar/NavList.svelte';
  import NavListItem from '$lib/Navbar/NavListItem.svelte';
</script>

<NavbarBase>
  <NavList>
    <NavListItem href={base} big>CS 295</NavListItem>
  </NavList>
  <NavList>
    <NavListItem href={base}>Home</NavListItem>
    <NavListItem href={edstem} external>Ed Discussion</NavListItem>
    <NavListItem href={canvas} external>Canvas</NavListItem>
  </NavList>
</NavbarBase>
