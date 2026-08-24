// public/og-default.png を生成する。フォントは Noto Serif JP(サイト見出しと同じ書体)。
// 生成済みPNGはリポジトリにコミットしてあるので、通常このスクリプトを実行する必要はない。
import fs from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const FONT = 'C:/Windows/Fonts/NotoSerifJP-VF.ttf';
const NAME = 'みおの備忘録';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#14141f"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#2b2b44" stroke-width="1"/>
  <line x1="540" y1="392" x2="660" y2="392" stroke="#c9a961" stroke-width="1.5"/>
  <text x="600" y="345" text-anchor="middle" font-family="Noto Serif JP"
        font-size="96" font-weight="600" fill="#e9e7e1" letter-spacing="10">${NAME}</text>
</svg>`;

const resvg = new Resvg(svg, {
  font: { fontFiles: [FONT], loadSystemFonts: false, defaultFontFamily: 'Noto Serif JP' },
  fitTo: { mode: 'width', value: 1200 },
});

fs.writeFileSync('public/og-default.png', resvg.render().asPng());
console.log('wrote public/og-default.png');
