<script>
	import lodash from 'lodash';

	import { page } from '$app/stores';
	import CreateProfileNotification from '$components/notifications/CreateProfile.svelte';

	import DesktopNav from './Desktop.svelte';
	import MobileNav from './Mobile.svelte';

	let hidden = true;

	const { isEmpty } = lodash;
</script>

<div class="bottomShadow z-10 bg-white">
	{#if $page.data.user.isAuthenticated}
		{#if isEmpty($page.data.user.profile)}
			<CreateProfileNotification />
		{/if}
	{/if}
	<div class="relative mx-auto max-w-screen-xl bg-white px-4 py-6 sm:px-6 lg:px-8">
		<div
			class="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition lg:hidden"
			class:hidden
			class:block={!hidden}>
			<div class="rounded-lg shadow-md">
				<div
					class="overflow-hidden rounded-lg bg-white ring-1 ring-black ring-opacity-5"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="main-menu">
					<div class="flex items-center justify-between px-5 pt-4">
						<div>
							<img class="h-8 w-auto" src="/images/THAT-Full-Wide.svg" alt="THAT Logo" />
						</div>
						<div class="-mr-2">
							<button
								type="button"
								class="inline-flex items-center justify-center rounded-md p-2
                    text-gray-400 transition duration-150
                    ease-in-out hover:bg-gray-100 hover:text-gray-500
                    focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
								aria-label="Close menu"
								on:click|preventDefault={() => (hidden = !hidden)}>
								<svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>
					<div class="px-2 pb-3 pt-2">
						<MobileNav />
					</div>
				</div>
			</div>
		</div>
		<nav class="relative flex items-center justify-between sm:h-10 lg:justify-start">
			<div class="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
				<div class="flex w-full items-center justify-between lg:w-auto">
					<a data-sveltekit-prefetch href="/" aria-label="Home">
						<img class="h-8 w-auto sm:h-10" src="/images/THAT-Full-Wide.svg" alt="THAT Logo" />
					</a>
					<div class="-mr-2 flex items-center lg:hidden">
						<button
							type="button"
							class="inline-flex items-center justify-center rounded-md p-2
                  text-gray-400 transition duration-150
                  ease-in-out hover:bg-gray-100 hover:text-gray-500
                  focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
							id="main-menu"
							aria-label="Main menu"
							aria-haspopup="true"
							on:click|preventDefault={() => (hidden = !hidden)}>
							<svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div class="lg:w-full">
				<DesktopNav />
			</div>
		</nav>
	</div>
</div>

<style>
	.bottomShadow {
		box-shadow: 0 5px 5px -5px #333;
	}
</style>
