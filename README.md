# LMS Frontend

### Setup instructions

1. Clone the project 

```
    git clone https://github.com/Rudraprasad-Mohapatra/lms-frontend.git
```

2. Move into the directory

```
    cd lms-frontend
```

3. install dependencies
```
    npm i
```

4. run the server
```
    npm run dev
```

### Setup instructions for Tailwind CSS

[Setting up Tailwind CSS in a Vite project.](https://tailwindcss.com/docs/guides/vite)

1. Add the following details in the plugin property of tailwind config
```
      [require("daisyui"), require("@tailwindcss/line-clamp")]
```


### Adding pugins and dependencies

```
npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
```

### Configure auto import sort eslint

1. Install simple-import-sort

```
    npm i -D eslint-plugin-simple-import-sort
```
2. Add rule in `.eslintrc.cjs`

```
    'simple-import-sort/imports': 'error'
```
3. add simple-import sort plugin in '.eslint.cjs'

```
      plugins: [..., 'simple-import-sort'],
```

4. To enable auto import sort on file save in vscode
    -Open `settings.json`
    -add the following config in the existing config
```
    ,"editor.codeActionOnSave": {
        "source.fixAll.eslint": true
    }
```