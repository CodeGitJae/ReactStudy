const path = require('path');
const webpack = require('webpack');

module.exports = {
   mode: 'development',
   devtool: 'eval',  // 프로덕션일 경우 hidden-source-map
   resolve: {
      extensions: ['.jsx', 'js'],
   },

// 아래 main    
   entry: {
      app: './client',
   },
   module: {
      rules: [{
         test: /\.jsx?$/,
         loader: 'babel-loader',
         options: {
            presets: [
            ['@babel/preset-env', {  //자동으로 옛날 브라우저를 지원해주는 모듈  (사용자 정의)
               targets: {
                  browsers: ['> 5% in KR', 'last 2 chrome versions'],   // 제일 마지막 버전의 최근 2번까지 호환되도록 설정  browserslist(공식 문서 분류) 
               },                     
               debug: true,
               }],
               '@babel/preset-react',
            ],
         }
      }],
   },
   plugins: [
      new webpack.LoaderOptionsPlugin({ debug: true}),
   ],
   output: {
      filename: 'app.js',
      path: path.join(__dirname, 'dist'),
   },
};