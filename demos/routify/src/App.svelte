<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
  import useAckeeSvelte from 'svelte-ackee';
  // import {useAckeeSvelte} from './ackee.js';

  import { afterPageLoad } from "@roxi/routify"
  

  useAckeeSvelte($afterPageLoad, {
		server: 'https://example.com',
		domainId: 'hd11f820-68a1-11e6-8047-79c0c2d9bce0'
	}, {
		ignoreLocalhost: false
	})

</script>

<style  global>
  @import "../assets/global.css";
</style>

<Router {routes} />