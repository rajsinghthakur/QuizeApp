import { validationResult } from "express-validator";
import User from "../model/user.model.js"

export const signup = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    User.create({
        username: request.body.username,
        password: request.body.password,
        email: request.body.email
    })
        .then((result) => {
            return response.status(200).json({ data: result.dataValues, message: "Signup Success...." });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error....", err });
        });
}

export const signin = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    User.findOne({
        where: { username: request.body.username, password: request.body.password }, raw: true
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ data: result });
            return response.status(401).json({ message: 'unauthorized request.....' });
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error.....' });
        })
}

export const forgetpassword = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    User.findOne({
        where: { username: request.body.username, email: request.body.email }, raw: true
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ data: result });
            return response.status(401).json({ message: 'unauthorized request.....' });
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error.....' });
        })
}

export const setforgetpassword = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    User.update(
        {
            password: request.body.password
        },
        {
            where: {
                username: request.body.username,
                email: request.body.email
            },
            raw: true
        })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'password updated....' });
            return response.status(401).json({ message: 'unauthorized request.....' });
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error.....' });
        })
}