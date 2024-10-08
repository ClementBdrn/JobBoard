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
            ecmaVersion: 2020, // ou 'latest' si tu pr�f�res
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
                version: 'detect', // Utilise "detect" pour automatiquement d�tecter la version de React
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            // Ajout des r�gles de base pour JS et React
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,

            // D�sactiver des r�gles si n�cessaire
            'react/jsx-no-target-blank': 'off',

            // Activer la r�gle pour rafra�chir les composants React seulement quand n�cessaire
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],

            // Exemple d'une r�gle suppl�mentaire si tu en as besoin
            'react/prop-types': 'off', // Si tu n'utilises pas PropTypes
        },
    },
];
