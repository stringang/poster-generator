/**
 * 海报生成器
 *
 * canvas layer: https://stackoverflow.com/a/17555283/5204695
 */
const fs = require('fs')
const path = require('path')
const Canvas = require('canvas')

const Image = Canvas.Image;
const fontColor = '#FFFFFF';
const slashPicPath = './assets/images/slash.png'; // 日期斜杠符
const fontPath = './assets/fonts/SourceHanSansCN-Bold.otf'; // 字体文件
const contentPicPath = './assets/images/title.png'; // 海报标题图
const posterPicPath = './assets/images/pic.png'; // 海报底图
const posterGeneratorPath = '../poster.png' // 生成海报地址
const date = new Date();

function translatePath(pathname) {
    return path.join(__dirname, pathname);
}

Canvas.registerFont(translatePath(fontPath), { family: 'Source Han Sans CN' })

// 创建海报底图-第一层
const posterCanvas = Canvas.createCanvas(750, 1334);
const posterContext = posterCanvas.getContext('2d');
const posterImage = new Image();
posterImage.src = translatePath(posterPicPath);
posterContext.clearRect(0, 0, posterCanvas.width, posterCanvas.height);
posterContext.drawImage(posterImage, 0, 0, posterCanvas.width, posterCanvas.height);

// 海报内容
const posterContentCanvas = Canvas.createCanvas(648, 1180);
const posterContentContext = posterContentCanvas.getContext('2d');
const posterContentImage = new Image();
posterContentImage.src = translatePath(contentPicPath);
posterContentContext.clearRect(0, 0, posterContentCanvas.width, posterContentCanvas.height);
posterContentContext.drawImage(posterContentImage, 0, 0, posterContentCanvas.width, posterContentCanvas.height);

// 日期 slash
const slashImage = new Image();
slashImage.src = translatePath(slashPicPath);
posterContentContext.drawImage(slashImage, 55, 35, 8, 18);
// 动态日期
const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
posterContentContext.fillStyle = fontColor;
posterContentContext.font = '40px Source Han Sans CN';
posterContentContext.fillText(month, 0, 53);
posterContentContext.fillText(day, 71, 53);

// 动态文案
const content = "出色，所以出众。";
const contentArr = content.split(/，|。/);
let startYAxis = 268;

// 文案字体
posterContentContext.font = '52px Source Han Sans CN';
contentArr.forEach((value, index) => {
    posterContentContext.fillText(value, 0, startYAxis);
    startYAxis += 78;
});

// 组合 1，2 层
posterContext.drawImage(posterContentCanvas, 59, 76);

// 生成图片
posterCanvas.createPNGStream({compressionLevel: 1}).pipe(fs.createWriteStream(translatePath(posterGeneratorPath)))