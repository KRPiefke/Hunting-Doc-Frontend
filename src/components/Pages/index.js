import App from '../../App';
import LoginForm from '../Auth/LoginForm';
import RegistrationForm from '../Auth/RegistrationForm';

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
    {
        id: 'registration',
        path: '/registration',
        component: <RegistrationForm />,
    },
];

export default getPages;
