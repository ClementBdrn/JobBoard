import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    {
        ignores: ['dist', 'node_modules', 'build', 'vite.config.js'],
    },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020, // ou 'latest' si tu préfères
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: {
                    jsx: true, // support JSX
                },
                sourceType: 'module',
            },
        },
        settings: {
            react: {
                version: 'detect', // Utilise "detect" pour automatiquement détecter la version de React
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            // Ajout des règles de base pour JS et React
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,

            // Désactiver des règles si nécessaire
            'react/jsx-no-target-blank': 'off',

            // Activer la règle pour rafraîchir les composants React seulement quand nécessaire
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],

            // Exemple d'une règle supplémentaire si tu en as besoin
            'react/prop-types': 'off', // Si tu n'utilises pas PropTypes
        },
    },
];
