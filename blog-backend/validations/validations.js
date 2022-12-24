import { body } from 'express-validator';

//--------------------------------------------------------------------

export const loginValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'The password must be at least 5 characters long').isLength({min: 5}),
];

//--------------------------------------------------------------------

export const registerValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'The password must be at least 5 characters long').isLength({min: 5}),
    body('fullName', 'Specify a name of at least 3 characters').isLength({min: 3}),
    body('avatarUrl', 'Invalid link to the avatar').optional().isURL(),
];

//--------------------------------------------------------------------

export const postCreateValidation = [
    body('title', 'Enter the title of the article').isLength({min: 3}).isString(),
    body('text', 'Enter the text of the article').isLength({min: 3}).isString(),
    body('tags', 'Invalid tag format (specify an array)').optional().isString(),
    body('imageUrl', 'Invalid image link').optional().isString(),
];
