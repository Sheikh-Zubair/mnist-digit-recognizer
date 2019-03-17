const { PythonShell } = require('python-shell');


module.exports = (img_data) => {
    console.log('predictor called')
    const options = {
        mode: 'text',
        //encodeing: 'utf8',
        pythonPath: '/usr/bin/python3',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './ml_model',
        args: [JSON.stringify(img_data)]
    };
    console.log('creating promise')
    let pyshell = new PythonShell('data_wrangle.py', options)
    return new Promise((resolve, reject) => {
        pyshell.on('message', function (msg) {
            console.log('got msg')
            console.log(msg)
            resolve(msg)
        })
    })
}