import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../authentification/SignIn.vue';
import SignUp from '../authentification/SignUp.vue';
import HomeComponent from '../components/HomeComponent.vue';
const routes = [
    {
        name: 'Home',
        path: '/',
        component: HomeComponent,
    },
    {
        name: 'SignIn',
        path: '/signin',
        component: SignIn,
    },
    {
        name: 'SignUp',
        path: '/signup',
        component: SignUp,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;