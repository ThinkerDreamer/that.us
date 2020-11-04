import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';

import createPagingConfig from '../../../machines/paging';
import partnerQueryApi from '../../../dataSources/api.that.tech/partner/queries';

function createServices(client) {
  const { queryFollowers, queryNextFollowers } = partnerQueryApi(client);

  return {
    guards: {
      hasMore: (_, event) => event.data !== null,
    },

    services: {
      load: context => queryFollowers(context.meta.id),
      loadNext: context => queryNextFollowers(context.meta.id, context.cursor),
    },

    actions: {
      logError: (context, event) => console.error({ context, event }),

      loadSuccess: assign({
        items: (_, { data: { followers } }) => followers.members,
        cursor: (_, { data: { followers } }) => followers.cursor,
      }),

      loadNextSuccess: assign({ items: (_, event) => event.data }),

      loadedAllSuccess: assign({
        items: () => [],
        cursor: () => undefined,
      }),
    },
  };
}

function create(meta, client = getClient()) {
  const services = createServices(client);
  return Machine({ ...createPagingConfig(meta) }, { ...services });
}

export default create;
