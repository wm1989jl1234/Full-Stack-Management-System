<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">My System</span>
            </div>
            <el-form :model="loginUser" :rules="rules" class="loginForm" ref="loginForm" label-width="auto">
                <el-form-item label="Email" prop="email">
                    <el-input v-model="loginUser.email" placeholder="Please Enter Your Email"></el-input>
                </el-form-item>
                <el-form-item label="password" prop="password" class="password1">
                    <el-input v-model="loginUser.password" placeholder="Please Enter password" type="password"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">Login</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>Don't have an account?'<router-link to='/register'>Register Here</router-link></p>
                </div>
            </el-form>
        </section>
    </div>
</template>
<script>
    import jwt_decode from 'jwt-decode';

    export default {
        name: "login",
        data() {
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.loginUser.password) {
                    callback(new Error("passwords do not match!"));
                } else {
                    callback();
                }
            };
            return {
                loginUser: {
                    email: "",
                    password: "",
                },
                rules: {

                    email: [
                        {
                            type: "email",
                            required: true,
                            message: "Incorrect email format",
                            trigger: "blur"
                        }
                    ],
                    password: [
                        { required: true, message: "Password can't be empty", trigger: "blur" },
                        { min: 6, max: 30, message: "lenth should be 6-30", trigger: "blur" }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$axios
                            .post("/api/users/login", this.loginUser)
                            .then(res => {
                                this.$message({
                                    message: "Successfully login",
                                    type: "success"
                                });
                                //console.log(res);
                                //token
                                const { token } = res.data;
                                localStorage.setItem('eleToken', token);
                                const decoded = jwt_decode(token);
                                //console.log(decoded);
                                // token ´æ´¢µ½vuex
                                this.$store.dispatch("SET_AUTHENTICATED", !this.isEmpty(decoded));
                                this.$store.dispatch("SET_USER", decoded);
                                this.$router.push("/index");
                            });
                        

                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            }
        }
    };
</script>

<style scoped>
    

    .login {
        
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../assets/bg.jpg) no-repeat center center;
        background-size: 100% 100%;
    }

    .form_container {
        
        width: 370px;
        height: 210px;
        position: absolute;
        top: 20%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }
        .form_container .manage_tip .title {
           
            font-family: "Microsoft YaHei";
            font-weight: bold;
            font-size: 26px;
            color: #fff;
        }

    .loginForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }

    .tiparea {
        
        text-align: right;
        font-size: 12px;
        color: #333;
    }

        .tiparea p a {
            color: #409eff;
        }
</style>
