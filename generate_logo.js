const prompt = require('prompt');
const fs = require('fs');

const schema = {
    properties: {
        text: {
            description: 'Enter up to three characters',
            pattern: /^.{1,3}$/,
            message: 'Text must be 1 to 3 characters',
            required: true,
        },
        text_color: {
            description: 'Enter text color',
            required: true,
        },
        shape: {
            description: 'Enter shape (circle, triangle, or square)',
            pattern: /^(circle|triangle|square)$/,
            message: 'Shape must be circle, triangle, or square',
            required: true,
        },
        shape_color: {
            description: 'Enter shape color',
            required: true,
        },
    },
};

prompt.start();

prompt.get(schema, (err, result) => {
    if (err) {
        console.error(err);
        return;
    }

    const {
        text,
        text_color,
        shape,
        shape_color
    } = result;

    let shapeSVG = '';

    if (shape === 'circle') {
        shapeSVG = `<circle cx="150" cy="100" r="50" fill="${shape_color}" />`;
    } else if (shape === 'triangle') {
        shapeSVG = `<polygon points="100,150 200,150 150,50" fill="${shape_color}" />`;
    } else if (shape === 'square') {
        shapeSVG = `<rect x="100" y="50" width="100" height="100" fill="${shape_color}" />`;
    }

    const textSVG = `
  <text x="150" y="110" fill="${text_color}" font-size="30" font-family="Arial" text-anchor="middle">
    ${text}
  </text>
  `;


    const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200">
      ${shapeSVG}
      ${textSVG}
    </svg>
  `;

    fs.writeFile('logo.svg', svgContent, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Generated logo.svg');
    });
});