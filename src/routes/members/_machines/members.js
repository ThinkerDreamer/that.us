import { createMachine, assign } from 'xstate';
import { uniqBy } from 'lodash';

import gFetch from '$utilities/gFetch';
import { log } from '$utils/error';
import createPagingConfig from '$machines/paging';
import membersApi from '$dataSources/api.that.tech/members/queries';

function createServices() {
	const { queryMembers, queryMembersNext } = membersApi(gFetch());

	return {
		guards: {
			hasMore: (_, event) => event.data !== null
		},

		services: {
			load: () => queryMembers(),
			loadNext: (context) => queryMembersNext(context.cursor)
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'members members state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'members' }
				}),

			loadSuccess: assign({
				items: (_, { data }) => data.members,
				cursor: (_, { data }) => data.cursor
			}),

			// todo... we add to the object
			loadNextSuccess: assign({
				items: (context, event) => uniqBy([...context.items, ...event.data.members], (i) => i.id),
				cursor: (_, { data }) => data.cursor
			}),

			loadedAllSuccess: () => {} // stub action for now.
		}
	};
}

function create() {
	const services = createServices();
	return createMachine({ ...createPagingConfig() }, { ...services });
}

export default create;
