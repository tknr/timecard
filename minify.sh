#!/bin/bash
cd `dirname $0`

mkdir -p timecard/assets/js
mkdir -p timecard/assets/css
mkdir -p timecard/images

for js in `find src/assets/js/ -name *.js | grep -v min.`;do
	dst=${js/src/timecard}
	dst="${dst%%.js}.min.js"
	npx uglifyjs --compress --mangle -- ${js} >| ${dst}
done

for css in `find src/assets/css/ -name *.css | grep -v min.`;do
	dst=${css/src/timecard}
	dst="${dst%%.css}.min.css"
	npx cleancss ${css} >| ${dst}
done

for jpg in `find src/images/ -name *.jpg`;do
	dst=${jpg/src/timecard}
	cwebp -q 75 -metadata icc -sharp_yuv ${jpg} -o ${dst%%.jpg}.webp
done

for png in `find src/images/ -name *.png`;do
	dst=${png/src/timecard}
	cwebp -lossless -metadata icc ${png} -o ${dst%%.png}.webp
done

npx purgecss --css timecard/assets/css/*.css --content timecard/index.html timecard/assets/js/*.js --output timecard/assets/css
