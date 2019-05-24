const width = 500;
const ringWidth = 30;
const psdRate = 75

function rem2px(rem, fontSize) {
    return rem * fontSize;
}
/**
 * SVG 圆形进度条
 * @param {number} percent 进度 0.5
 * @param {number} width 圆直径
 * @param {number} psdRate px转rem的比例，比如750的psd，就是75
 * @param {number} ringWidth 进度条宽度
 * @param {string} colorDef 默认环颜色
 * @param {string} colorRing 进度环颜色
 * @param {string} colorInner 中间遮盖层颜色
 */
function drawRemSVGCircleProcessBar(percent, width, psdRate, ringWidth, colorDef, colorRing, colorInner){
    const fontSize = parseFloat(document.documentElement.style.fontSize.replace('px',''));
    const diameter = rem2px(width / psdRate, fontSize);
    const cx = diameter / 2;
    const cy = diameter / 2;
    const radius = diameter/2 - ringWidth;
    const perimeter = Math.PI * 2 * radius;
    const processer = percent * perimeter
    const template = `<svg width="${diameter}" height="${diameter}" viewBox="0 0 ${diameter} ${diameter}">
                  <circle cx="${cx}" cy="${cy}" r="${radius}" stroke-width="${ringWidth}" stroke="${colorDef}" fill="none"></circle>
                  <circle cx="${cx}" cy="${cy}" r="${radius}" stroke-width="${ringWidth}" stroke="${colorRing}" fill="none" transform="rotate(-90,${cx},${cy})" stroke-dasharray="${processer} ${perimeter}"></circle>
                  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="${colorInner}"></circle>
                </svg>`
    document.getElementById('circle').insertAdjacentHTML('afterend',template);
}
drawRemSVGCircleProcessBar(0.33, width, psdRate, ringWidth, '#D1D3D7', '#00A5E0', '#f6f7f8')

// 控制条
if (window.addEventListener) {
    const fontSize = parseFloat(document.documentElement.style.fontSize.replace('px',''));
    const range = document.querySelector("#range");
    const circle = document.querySelectorAll("circle")[1];
    if (range && circle) {
        range.addEventListener("change", function() {
            const percent = this.value / 100, perimeter = Math.PI * 2 * (rem2px(width / psdRate, fontSize)/2 - ringWidth); 
            circle.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent));
        });
    }
}