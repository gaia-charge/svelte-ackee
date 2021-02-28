import ackeeTracker from 'ackee-tracker';

import { writable, derived } from "svelte/store";

let hasChanged = false;

export const locationStore = writable({
  current:  undefined,
  previous: undefined,
});

export const routeHasChanged = derived(locationStore, ($l) => {

  if (!$l.previous || !$l.current) return true;

  if ($l.previous.pathname !== $l.current.pathname) return true;

  return false;
});

locationStore.subscribe( l => {
  if ( (!l.previous || !l.current) || (l.previous.pathname !== l.current.pathname)) 
    hasChanged = true;
  else
    hasChanged = false;

})


export function useAckeeSapper(beforeUpdate, afterUpdate, server, opts = {}) {
  let currentInstance = ackeeTracker.create(server, opts);
  beforeUpdate(() => {
    if (typeof window !== "undefined") {
      locationStore.update((l) => {
        return {
          previous: l.current,
          current: { ...window.location },
        };
      });
    }
  });
  afterUpdate(() => {
    if (hasChanged) {
      let path = window.location.pathname

      const attributes = ackeeTracker.attributes(opts.detailed)
      const url = new URL(path, location)

      currentInstance.record({
        ...attributes,
        siteLocation: url.href
      }).stop
    }
  });
}

/*
* USE ACKEE FOR SPA SVELTE
*/
export function useAckeeSvelte( afterPageLoad, server, opts = {}){
  let currentInstance = ackeeTracker.create(server, opts)
	
	afterPageLoad(page => {

    if (typeof window !== "undefined") {
      locationStore.update((l) => {
        return {
          previous: l.current,
          current: { ...window.location },
        };
      });
    }
    if (hasChanged) {
  		
      let path = window.location.pathname

      const attributes = ackeeTracker.attributes(opts.detailed)
      const url = new URL(path, location)

      currentInstance.record({
        ...attributes,
        siteLocation: url.href
      }).stop

    }

	})
	
}
