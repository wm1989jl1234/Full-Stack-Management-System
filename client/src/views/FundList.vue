<template>
    <div class="fillContainer">
        <div>
            <el-form :inline="true" prefix="add_data">
                <el-form-item class="btnRight">
                    <el-button type="primary" 
                               size="small"
                               icon="view" 
                               @click="handleAdd()"
                               >
                        Add
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table v-if="tableData.length>0"
                      :data="tableData"
                      max-height="450"
                      border
                      style="width: 100%">
                <el-table-column type="index" label="Index" align="center" width="70">
                </el-table-column>
                <el-table-column prop="date"
                                 label="Date"
                                 align="center"
                                 width="250"
                                 sortable>
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type"
                                 label="Type"
                                 align="center"
                                 width="150">
                </el-table-column>
                <el-table-column prop="describe"
                                 label="Description"
                                 align="center"
                                 width="180">
                </el-table-column>
                <el-table-column prop="income" label="Gain" align="center" width="170">
                    <template slot-scope="scope">
                        <span style="color:#00d053">{{ scope.row.income }}</span>
                    </template>

                </el-table-column>
                <el-table-column prop="expend" label="Expense" align="center" width="170">
                    <template slot-scope="scope">
                        <span style="color:#f56767">{{ scope.row.expend }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cash"
                                 label="Balance"
                                 align="center"
                                 width="170">
                    <template slot-scope="scope">
                        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Operations"
                                 prop="operation"
                                 align="center"
                                 fixed="right"
                                 width="160">
                    <template slot-scope="scope">
                        <el-button type="warning"
                                   size="small"
                                   icon="edit"
                                   align="center"
                                   @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="small"
                                   type="danger"
                                   icon="delete"
                                   align="center"
                                   @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination v-if="paginations.total > 0"
                                       :page-sizes="paginations.page_sizes"
                                       :page-size="paginations.page_size"
                                       :layout="paginations.layout"
                                       :total="paginations.total"
                                       :current-page.sync="paginations.page_index"
                                       @current-change="handleCurrentChange"
                                       @size-change="handleSizeChange">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <Dialog :dialog="dialog" :formData="formData" @update="getProfile">


        </Dialog>
    </div>
</template>
<script>
    import Dialog from '../components/Dialog'
    export default {
        name: "fundList",
        data() {
            return {
                paginations: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 5, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper", // 翻页属性
                },
                tableData: [],
                allTableData:[],
                formData: {
                    type: '',
                    describe: '',
                    income: '',
                    expend: '',
                    cash: '',
                    remark: '',
                    id: ''
                },
                dialog: {
                    show: false,
                    option:'edit'
                }
            };
        },
        created() {
            this.getProfile();
        },
        methods:{
            getProfile() {
                this.$axios("/api/profiles").then((res) => {
                    // this.tableData = res.data;
                    this.allTableData = res.data;
                    //this.filterTableData = res.data;
                    // 设置分页数据
                    this.setPaginations();
                })
             },
            handleCurrentChange(page) {
                 //当前页
                let sortnum = this.paginations.page_size * (page - 1);
                let table = this.allTableData.filter((item, index) => {
                    return index >= sortnum;
                });
                // 设置默认分页数据
                this.tableData = table.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
            },
            setPaginations() {
                //set page data
                this.paginations.total = this. allTableData.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 5;
                //set default page data
                this.tableData = this.allTableData.filter((item, index) => {
                    return index < this.paginations.page_size;
                })
            },
            handleSizeChange(page_size) {
                 //切换size
                this.paginations.page_index = 1;
                this.paginations.page_size = page_size;
                this.tableData = this.allTableData.filter((item, index) => {
                    return index < page_size;
                });
            },
            handleEdit(index, row) {
                this.dialog = {
                    show: true,
                    title: "Edit Fund Information",
                    option: 'edit'
                };

                this.formData = {
                    type: row.type,
                    describe: row.describe,
                    income: row.income,
                    expend: row.expend,
                    cash: row.cash,
                    remark:row.remark,
                    id: row._id,
                }
            },
            handleDelete(index, row) {
                this.$axios.delete(`/api/profiles/delete/${row._id}`).then((res) => {
                    this.$message("Deleted");
                    this.getProfile();
                });
            },
            handleAdd() {
                this.dialog = {
                    show: true,
                    title: "Add Fund Information",
                    option: 'add'
                };
                this.formData = {
                    type: '',
                    describe: '',
                    income: '',
                    expend: '',
                    cash: '',
                    remark: '',
                    id: ''
                }
            }

        },
        components: {
            Dialog
        },
    }

</script>

<style scoped>
    .fillcontain {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }

    .btnRight {
        float: right;


    }

    .pagination {
        text-align: right;
        margin-top: 10px;
    }
</style>