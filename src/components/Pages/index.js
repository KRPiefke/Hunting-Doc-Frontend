import LoginForm from '../Auth/LoginForm';

const getPages = () => [
    {
        id: 'login',
        path: 'login',
        component: <LoginForm />,
    },
];

export default getPages;
