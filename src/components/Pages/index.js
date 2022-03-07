import App from '../../App';
import LoginForm from '../Auth/LoginForm';

const getPages = () => [
    {
        id: 'appBar',
        path: '/',
        component: <App />,
        children: [
            {
                id: 'login',
                path: 'login',
                component: <LoginForm />,
            },
        ],
    },
];

export default getPages;
