<template>
    <el-row class="menu_page">
        <el-col >

            <el-menu 
                     class="el-menu-vertical-demo"                   
                     background-color="#324057"
                     text-color="#fff"
                     active-text-color="#409eff">
                <router-link to="/home">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">Home Page</span>
                    </el-menu-item>
                    <template v-for="item in items">
                        <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                            <template slot="title">
                                <i :class="'fa fa-margin'+item.icon">
                                    <span class="span" slot="title">{{item.name}}</span>
                                </i>
                            
                            </template>
                            <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                                <el-menu-item :index="citem.path">
                                    <span class="span" slot="">{{citem.name}}</span>
                                </el-menu-item>
                            </router-link>
                        </el-submenu>
                    </template>
                </router-link>
                
            </el-menu>
        </el-col>
    </el-row>

</template>
<script>
    export default {
        name: 'left-menu',
        data() {
            return {
                items: [{
                    icon: 'fa-money',
                    name: "Fund Management",
                    path: "fund",
                    children: [
                        {path:"fundlist",name:"Transaction History"}
                    ]
                }, 
                {
                    icon: 'fa-asterisk',
                    name: "Info Management",
                    path: "info",
                    children: [
                        { path: "infoshow", name: "Personal Information" }
                    ]
                    }]
            }
        },
    };
</script>
<style scoped>
    .menu_page {
        position: fixed;
        top: 71px;
        left: 0;
        min-height: 100%;
 
        background-color: #324057;
        z-index: 99;
        
    }

    .el-menu {
        background-color:#fff;
        border: none;
    }

    .fa-margin {
        margin-right: 5px;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        
        width: 180px;
        min-height: 400px;
    }

    .el-menu-vertical-demo {
        width: 35px;
    }

    .el-submenu .el-menu-item {
        min-width: 180px;
        
    }

    .hiddenDropdown,
    .hiddenDropname {
        display: none;
    }

    a {
        
        text-decoration: none;
    }
    .span{
        color:white;

    }
</style>

