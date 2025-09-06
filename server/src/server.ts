import cookieParser from "cookie-parser";   
import cors from 'cors';
import express from 'express';
import session from "express-session";
import passport from "passport";    
// import OAuth2Strategy  from "passport-oauth2"; 
import dotenv from 'dotenv';
dotenv.config();
import * as GoogleStrategy from 'passport-google-oauth20';

const app =express();
app.use(cors({
    credentials: true,
    origin: process.env.WEBSITE_URL || 'http://localhost:5173'
}));

const isSecureEnv = process.env.NODE_ENV === 'production';

if(isSecureEnv) {
    app.set('trust proxy', 1); // trust first proxy
}

const sessionConfig : any= {
    secret: process.env.NX_SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: isSecureEnv, // Use secure cookies in production
        sameSite: isSecureEnv ? "none" : "lax", // 'none' for cross-site cookies in production
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
};
app.use(session(sessionConfig));
app.use(cookieParser()); 


//Paasport configuration
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new OAuth2Strategy({
//     authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
//     tokenURL: 'https://oauth2.googleapis.com/token',
//     clientID: process.env.GOOGLE_CLIENT_ID || '',
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     callbackURL: process.env.GOOGLE_OAUTH_REDIRECT_URI || '',
//     state:true,
//     scope: ['email', 'profile', 'openid'],
//     skipUserProfile:true, 
// }, (accessToken:any, refreshToken:any, profile:any, done:any) => {
//     // Here you can save the user profile and tokens to your database
//     console.log(accessToken, refreshToken, profile );
//     console.log("Access Token:", accessToken);
//     return done(null, { accessToken, refreshToken, profile });
// }));


passport.use(new GoogleStrategy.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_OAUTH_REDIRECT_URI || '',
       scope: ['email', 'profile', 'openid']
     
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("Succes,..",profile.id)
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    cb(null, { accessToken, refreshToken, profile  }); // Return the user profile and tokens
  }));

passport.serializeUser((user, done) => { 
    done(null, user);
});

passport.deserializeUser((user:any, done) => { 
    // Here you can retrieve the user from your database
    done(null, user);
});

app.get('/auth', passport.authenticate('oauth2'));

app.get('/error', (req, res) => {
    res.status(500).json({ error: 'Authentication failed' })});

    app.get('/success', (req, res) => {
    res.status(200).json({ message: 'Authentication successful', user: req.user }); });

app.get('/google', passport.authenticate('google',{scope : ['email','profile']}));

app.get('/callback', passport.authenticate('google', { failureRedirect: '/login', successRedirect:"http://localhost:5173" }))

   // GET  /auth/google/callback
  // Rest Point for React to call for user object From google APi
   app.get('/login/success', (req,res)=>{
    console.log("/login/success", req.user)
     if (req.user) {
         res.json({
          message : "User Authenticated",
         user : req.user
        })
     }
     else res.status(400).json({
       message : "User Not Authenticated",
      user : null
    })
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});     

server.on('error', (err) => {
    console.error('Server error:', err);
});