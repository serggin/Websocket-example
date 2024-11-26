import { Router } from 'express';
import { NextFunction, Request, Response } from "express";

export default function init(/*logout: (user: string) => void*/) {
    const router = Router();

    router.get('/', (req, res) => {
        res.render('login');
    });

    router.post('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (checkAuth(username, password)) {
            req.session.user = username;
            res.redirect('/chat');
        } else {
            res.render('login', { failed: true });
        }
    });

    router.get('/chat', checkAuthRoute, (req, res) => {
        res.render('chat', { user: req.session.user, logout: true, script: 'chat.js' });
    });

    router.get('/logout', (req, res) => {
        //        logout(req.session.user);
        delete req.session.user;
        res.redirect('/');
    });

    return router;
}

function checkAuth(username: string, password: string) {
    // ignore password for this demo
    return ['u1', 'u2', 'u3'].includes(username);
}

function checkAuthRoute(req: Request, res: Response, next: NextFunction) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
}