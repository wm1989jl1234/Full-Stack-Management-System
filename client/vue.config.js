const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
});

const path = require("path")
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
    publicPath:
        process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
    outputDir: "dist",
    assetsDir: "assets",
    lintOnSave: false,
    runtimeCompiler: true,
    transpileDependencies: false,
    productionSourceMap: true,
    // configureWebpack: (config) => {
    //   // webpack���ã�ֵλ����ʱ��ϲ����ã�Ϊ����ʱ���д����
    //   if (debug) {
    //     // ������������
    //     config.devtool = "eval-cheap-module-source-map";
    //   } else {
    //     // ������������
    //   }
    // },
    // chainWebpack: (config) => {
    //   // webpack����API���������ɺ��޸�webapck���ã�https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    //   if (debug) {
    //     config.devtool = "eval-cheap-module-source-map"; // ���ؿ�������
    //   } else {
    //     // ������������
    //   }
    // },
    parallel: require("os").cpus().length > 1,
    pluginOptions: {
        // �������������
    },
    pwa: {
        // ��ҳ���������� https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    devServer: {
        open: true,
        host: "localhost",
        port: 8080,
        https: false,
        hot: false,
        proxy: {
            "/api": {
                target: "http://localhost:5000/api/",
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
};