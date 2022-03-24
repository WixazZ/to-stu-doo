import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../authentification/SignIn.vue';
import SignUp from '../authentification/SignUp.vue';
import UserMenu from '../App/UserMenu.vue';
import HomeComponent from '../components/HomeComponent.vue';
import StudooList from '../App/StudooList.vue';

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
    {
        name: 'UserMenu',
        path: '/studoolist',
        component: UserMenu,
    },
    {
        name: 'StudooList',
        path: '/studoolist/:id',
        component: StudooList,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;