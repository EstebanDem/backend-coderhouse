import express from "express";
import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';
import userRouter from './routes/user.js';
import session from 'express-session';
import {engine} from 'express-handlebars';
import path from 'path';
import {fileURLToPath} from 'url';
import mongoStore from 'connect-mongo';
import {Strategy} from 'passport-facebook';
import passport from "passport";

const PORT = 3027;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

passport.use(new Strategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos'],
    scope: ['email']
},
(accessToken, refreshToken, userProfile, done) => {
    return done(null, userProfile);
}))

passport.serializeUser((user, done) => {
    done(null, user)
})
//
passport.deserializeUser((id, done) => {
    done(null, id)
})

app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.use(
    session({
        store: mongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            options: {
                userNewParser: true,
                useUnifiedTopology: true,
            }
        }),
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 600000} //10 min.
        
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);
app.use('/api/usuario', userRouter);


/* -------------------------------- Facebook -------------------------------- */

app.use(passport.initialize());
app.use(passport.session());

app.get('/fb-login', async(req, res) => {
    res.render('pages/fb')
})

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/failLogin'
    
}))

app.get('/', (req,res) => {
    if(req.isAuthenticated()) {
        res.render('pages/home', {status: true, fbUserName: req.user.displayName, avatar: req.user.photos[0].value})
    } else {
        res.render('pages/home', {status: false})
    }
})


app.get('/fb-logout', (req, res) => {
    req.logout();
    res.redirect('/api/usuario')
})

const server = app.listen(PORT, () => {
    console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
    })
    
server.on('error', (err) => console.log(err));