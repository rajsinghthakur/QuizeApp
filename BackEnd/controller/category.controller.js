import { validationResult } from "express-validator";
import Category from "../model/category.model.js"

export const add = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Category.create({
        categoryname: request.body.categoryname
    })
        .then((result) => {
            return response.status(200).json({ data: result.dataValues, message: "add Success...." });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error....", err });
        });
}

export const list = (request, response, next) => {
    Category.findOne()
        .then((result) => {
            if (result)
                return response.status(200).json({ data: result });
            return response.status(401).json({ message: 'unauthorized request.....' });
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error.....' });
        })
}

export const search = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Category.findOne({
        where: { Categoryname: request.body.Categoryname }, raw: true
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