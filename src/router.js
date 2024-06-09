import { createRouter, createWebHistory } from 'vue-router';

import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import TeamsList from './pages/TeamsList.vue';
import UsersFooter from './pages/UsersFooter.vue';
import UsersList from './pages/UsersList.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            // component: TeamsList
            redirect: '/teams' //alternative to this below
        },
        {
            name: 'teams',
            path: '/teams',
            meta: {
                needsAuth: true
            },
            components: {
                default: TeamsList,
                footer: TeamsFooter
            },
            // it is same as component: teamlist
            // alias: '/'
            children: [{
                name: 'team-members',
                path: ':teamId',
                component: TeamMembers,
                props: true
            }]
        },
        {
            path: '/users',
            // component: UsersList
            components: {
                default: UsersList,
                footer: UsersFooter
            },
            beforeEnter(to, from, next) {
                console.log("users beforeEnter");
                console.log(from, to);
                next();
            }
        },
        // {
        //     path: '/teams/:teamId',
        //     component: TeamMembers,
        //     props: true
        // },
        {
            path: '/:notFound(.*)',
            // redirect: '/teams',
            component: NotFound
        }
    ],
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savedPosition) {
        // console.log(to, from, savedPosition);
        if(savedPosition)
            return savedPosition;
        
        return {
            left: 0,
            top: 0,
        };
    }
});

// On every navigation function
router.beforeEach((to, from, next) => {
    console.log("Global beforeEach");
    console.log(to, from);
    if (to.meta.needsAuth) {
        console.log(to.meta);
        next();
    } else {
        next();
    }
    // next(false);
    // next('/users');
    // if(to.name === 'team-members')
    //     next();
    // else
    //     next({name: 'team-members', params: { teamId: 't2' }});
});

router.afterEach((to, from) => {
    //sending analytics data is agood use case, no next
    console.log('global AFterEach');
    console.log(to, from);
});

export default router;