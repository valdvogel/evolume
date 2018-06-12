const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//process.env.NODE_ENV  = 'test';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });

} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {

    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    if (env === 'test')
        require('dotenv').config({ path: '.env.test' });


    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }

                    ]
                })
            },
            {
                test: /\.(?:png|jpg|svg|jpeg)$/,
                loader: 'url-loader',
                query: {
                    // Inline images smaller than 10kb as data URIs        limit: 10000
                }
            }]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_DOMAIN': JSON.stringify(process.env.FIREBASE_DATABASE_DOMAIN),
                'process.env.FIREBASE_PROJECTID': JSON.stringify(process.env.FIREBASE_PROJECTID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSASING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSASING_SENDER_ID),
                'process.env.AWS_ACCESSKEYID': JSON.stringify(process.env.AWS_ACCESSKEYID),
                'process.env.AWS_SECRETACCESSKEY': JSON.stringify(process.env.AWS_SECRETACCESSKEY),
                'process.env.AWS_REGION': JSON.stringify(process.env.AWS_REGION),
                'process.env.ELK_APP': JSON.stringify(process.env.ELK_APP),
                'process.env.ELK_CREDENTIALS': JSON.stringify(process.env.ELK_CREDENTIALS),
                'process.env.ELK_TYPE': JSON.stringify(process.env.ELK_TYPE),
                'process.env.MOIP_URL_ROOT': JSON.stringify(process.env.MOIP_URL_ROOT),
                'process.env.MOIP_USERNAME': JSON.stringify(process.env.MOIP_USERNAME),
                'process.env.MOIP_PASSWORD': JSON.stringify(process.env.MOIP_PASSWORD),
                'process.env.MOIP_AUTH': JSON.stringify(process.env.MOIP_AUTH)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};