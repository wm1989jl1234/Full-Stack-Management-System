<template>
    <div class="dialog">
        <el-dialog 
                   :title="dialog.title"
                   :visible.sync="dialog.show"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :modal-append-to-body="false"
                   >
            <div class="form">
                <el-form ref="form"
                         :model="formData"
                         label-width="120px"
                         :rules="form_rules"
                         style="margin:10px;width:auto">
                    <el-form-item label="Transfer Type:">
                        <el-select v-model="formData.type" placeholder="TransferType">
                            <el-option v-for="formtype,index) in format_type_list"
                                       :key="index"
                                       :label="formtype"
                                       :value="formtype">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="describe" label="Description">
                        <el-input type="describe" v-model="formData.describe"></el-input>
                    </el-form-item>
                    <el-form-item prop='income' label="Income:">
                        <el-input type="income" v-model="formData.income"></el-input>
                    </el-form-item>

                    <el-form-item prop='expend' label="Expense:">
                        <el-input type="expend" v-model="formData.expend"></el-input>
                    </el-form-item>

                    <el-form-item prop='cash' label="Balance:">
                        <el-input type="cash" v-model="formData.cash"></el-input>
                    </el-form-item>

                    <el-form-item label="Comment:">
                        <el-input type="textarea" v-model="formData.remark"></el-input>
                    </el-form-item>
                    <el-form-item class="tesxt_right">
                        <el-button @click="dialog.show=false">
                            Cancel
                        </el-button>
                        <el-button type="primary" @click='onSubmit("form")'>
                            Submit
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>   
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'dialog',
        data() {
            return {
                formData: {
                    type: '',
                    describe: '',
                    income: '',
                    expend: '',
                    cash: '',
                    remark: '',
                    id: ''
                },
                format_type_list: [
                    "Withdraw",
                    "WithdrawExpense",
                    "coupound",
                    "Transfer",
                ],
                form_rules: {
                    describe: [
                        { required:true, message: "Description can't be empty", trigger:"blur"}
                    ],
                    income: [
                        { required: true, message: "Income can't be empty", trigger: "blur" }
                    ],
                    expend: [
                        { required: true, message: "Expense can't be empty", trigger: "blur" }
                    ],
                    cash: [{ required: true, message: "Balance can't be empty", trigger: "blur" }]
                }
            };
        },
        props: {
            dialog: Object,
            formData:Object,

        },
        methods: {
            onSubmit(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        //表单数据验证完成之后，提交数据;
                        const url =
                            this.dialog.option == "add" ? "add" : `edit/${this.formData.id}`;
                        this.$axios.post(`/api/profiles/${url}`, this.formData).then(res => {
                            // 操作成功
                            this.$message({
                                message: "保存成功！",
                                type: "success"
                            });
                            this.dialog.show = false;
                            this.$emit("update");
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>

