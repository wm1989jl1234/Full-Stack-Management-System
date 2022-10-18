const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const keys = require("../../config/keys");
const { secretOrKey } = require("../../config/keys");
const passport = require("passport");
//router get api/users/test
//@desc 返回的请求的json数据
//@accesspublic
/*
router.get("/test",(req, res)=> {
    res.json({ msg: "login works" })
})*/
//router post api/users/test
//@desc 返回的请求的json数据
//@accesspublic
router.post("/register", (req, res) => {
    //console.log(req.body);
    //查询数据库中是否拥有邮箱
    
    User.findOne({ email: req.body.email })
        .then((user)=> {
        if (user) {
            return res.status(400).json( "邮箱已被注册" )
        } else {
            var avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
            const newUser = new User({
                email: req.body.email,
                name: req.body.name,
                avatar,
                identity: req.body.identity,
                
                password: req.body.password
            })
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    // Store hash in your password DB.
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });

        }

    })
    
})

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json("does not exist" );
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        };
                        jwt.sign(rule, secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err;
                            res.json({
                                
                                success: true,
                                token: "Bearer " + token
                            });
                        })
                        //res.json({ msg: "sucess" });
                    }
                    else {
                        return res.status(400).json("密码错误！")
                    }
            
                    // result == true
            });
        })
})
//router get api/users/current
//@desc return current user
//@access private
router.get("/current", passport.authenticate("jwt", {session:false}),(req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.emailm,
        identity:req.user.identity
    });
})

module.exports = router;