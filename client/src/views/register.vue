<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">My System</span>
            </div>
            <el-form :model="registerUser" :rules="rules" class="registerForm" ref="registerForm" label-width="80px">
                <el-form-item label="Name" prop="name">
                    <el-input v-model="registerUser.name" placeholder="Please Enter User name"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="registerUser.email" placeholder="Please Enter email"></el-input>
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input v-model="registerUser.password" placeholder="Please Enter password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="confirm" prop="password2">
                    <el-input v-model="registerUser.password2" placeholder="Please enter password again" type="password"></el-input>
                </el-form-item>
                <el-form-item label="identity">
                    <el-select v-model="registerUser.identity" placeholder="Please choose identity">
                        <el-option label="Manager" value="manager"></el-option>
                        <el-option label="Employee" value="employee"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">Register</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>
<script>
    export default {
        name: "register",
        data() {
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.registerUser.password) {
                    callback(new Error("passwords do not match!"));
                } else {
                    callback();
                }
            };
            return {
                registerUser: {
                    name: "",
                    email: "",
                    password: "",
                    password2: "",
                    identity: ""
                },
                rules: {
                    name: [
                        { required: true, message: "Username Can't be empty", trigger: "change" },
                        { min: 2, max: 30, message: "length should be 2-30", trigger: "blur" }
                    ],
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
                    password2: [
                        { required: true, message: "confirm password can't be empty", trigger: "blur" },
                        {
                            min: 6,
                            max: 30,
                            message: "lenth should be 6-30",
                            trigger: "blur"
                        },
                        { validator: validatePass2, trigger: "blur" }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$axios
                            .post("/api/users/register", this.registerUser)
                            .then(res => {
                                // ×¢²á³É¹¦
                                this.$message({
                                    message: "Successfully registered£¡",
                                    type: "success"
                                });
                                this.$router.push("/login");
                            });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    };
</script>
<style scoped>
    .register {
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
        top: 10%;
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

    .registerForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }
</style>