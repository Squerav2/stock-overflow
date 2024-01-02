<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
		<div class="logo">
            <div class="title-logo">
                <img :src="logoURL" alt="Vue" /> 
                <h4>Stock Overflow</h4>
            </div>
		</div>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
			</button>
		</div>

	
		<div class="menu">
			<router-link to="/" class="button">
				<span class="material-icons">home</span>
				<span class="text">Home</span>
			</router-link>
			<router-link to="/portfolio" class="button">
				<span class="material-icons">wallet</span>
				<span class="text">Portfolio</span>
			</router-link>
			<router-link to="/watchlist" class="button">
				<span class="material-icons">monitor</span>
				<span class="text">Watchlist</span>
			</router-link>
		</div>
		
		<!-- Kullanıcı giriş yaptıysa portföy tutarını göster -->
		<div v-if="isAuthenticated" class="portfolio-total">
    Toplam Portföy Tutarı: {{ portfolioTotal }} TL
  </div>

		<div class="flex"></div>
		
		<div class="menu">
			<router-link to="/contact" class="button">
				<span class="material-icons">phone</span>
				<span class="text">Contact us</span>
			</router-link>
		</div>
	</aside>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue';
import { useStore } from 'vuex';
import logoURL from '../assets/vue.svg'

const store = useStore();
//const isAuthenticated = computed(() => store.state.isAuthenticated);
//const portfolioTotal = computed(() => store.state.portfolioTotal);


const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
}
</script>

<style lang="scss" scoped>

aside {
	display: flex;
	flex-direction: column;

	background-color: var(--dark);
	color: var(--light);
	position: fixed;
	left: 0;
	top: 0;
	width: calc(10rem + 32px);
	min-height: 100vh;
	padding: 1rem;

	transition: 0.2s ease-in-out;
z-index: 1000;
	&.is-expanded {
    width: var(--sidebar-width); // Genişletilmiş genişlik
    transform: translateX(0); // Eğer gerekliyse genişletilmiş konumu ayarlayın
  }
	.flex {
		flex: 1 1 0%;
	}

	.logo {
		z-index: 2;
		margin-bottom: 1rem;

		img {
			width: 2rem;
		}
	}

	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;

		.menu-toggle {
			transition: 0.2s ease-in-out;
			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}
			
			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}

	h3, .button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.menu {
		margin: 0 -1rem;

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;

			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;

			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			.text {
				color: var(--light);
				transition: 0.2s ease-in-out;
				opacity: 1;
			}

			&:hover {
				background-color: var(--dark-alt);

				.material-icons, .text {
					color: var(--primary);
				}
			}

			&.router-link-exact-active {
				background-color: var(--dark-alt);
				border-right: 5px solid var(--primary);

				.material-icons, .text {
					color: var(--primary);
				}
			}
		}
	}

	.footer {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;

		p {
			font-size: 0.875rem;
			color: var(--grey);
		}
	}

	&.is-expanded {
		width: var(--sidebar-width);

		.menu-toggle-wrap {
			top: -3rem;
			
			.menu-toggle {
				transform: rotate(-180deg);
			}
		}

		h3, .button .text {
			opacity: 1;
		}

		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}

		.footer {
			opacity: 0;
		}
	}

	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}
</style>