import { createMachine, assign } from 'xstate';

import gFetch from '$utilities/gFetch';
import { log } from '$utils/error';
import partnersApi from '$dataSources/api.that.tech/partner/queries';
import createPagingConfig from '$machines/paging';

function createServices() {
	const { getUpcomingPartners, getUpcomingPartnersNext } = partnersApi(gFetch());

	return {
		guards: {
			hasMore: (_, event) => event.data.length > 0
		},

		services: {
			load: () => getUpcomingPartners(),
			loadNext: () => getUpcomingPartnersNext()
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'partners partners state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'partners' }
				}),

			loadSuccess: assign({
				items: (_, { data }) => data,
				cursor: () => undefined
			}),

			loadNextSuccess: assign({
				items: (context) => [...context.items],
				cursor: () => undefined
			}),

			loadedAllSuccess: () => {}
		}
	};
}

function create(eventSlug) {
	const services = createServices();

	return createMachine({ ...createPagingConfig({ eventSlug }) }, { ...services });
}

export default create;
