import Vue from 'vue';
import Router from 'vue-router';
import Staking from '@/components/staking'

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'staking',
        component: Staking
    }],
    linkActiveClass: 'active'
});