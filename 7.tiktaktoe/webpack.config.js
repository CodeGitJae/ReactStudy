const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'tictactoe-dev',
    mode: 'development',  // 실제 서비스할 때는 production으로 변경하면된다고함.
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    // 입력
    entry: {
        app: ['./client'],  // 클라이언트 안에 불러온 다른 확장자 파일도 포함되어 가져옴
    },

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
               presets: [
               ['@babel/preset-env', {  //자동으로 옛날 브라우저를 지원해주는 모듈  (사용자 정의)
                  targets: {
                     browsers: ['> 1% in KR'],   // 제일 마지막 버전의 최근 2번까지 호환되도록 설정  browserslist(공식 문서 분류) 
                  },                     
                  debug: true,
                  }],
                  '@babel/preset-react',
               ],
               plugins: [
                'react-refresh/babel',
               ]
            },
        }],
    },
    plugins: [
        new RefreshWebpackPlugin()
    ],
    // 출력
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist',
    },
    devServer: {     // 변경점을 감지해서 수정된 내용을 즉시 반영해주는 설정
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },  // 디렉토리는 포함된 폴더가 있을 경우 뒤에 작은 ''따옴표 안에  디렉토리명 넣으면됨
        hot: true
    },
};

