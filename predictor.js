const { PythonShell } = require('python-shell');


module.exports = (img_data) => {
    console.log('predictor called')
    let py = (process.env.NODE_ENV === 'production')? process.env.PYTHONPATH : '/usr/bin/python3'
    const options = {
        mode: 'text',
        //encodeing: 'utf8',
        pythonPath: py,
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './ml_model',
        args: [JSON.stringify(img_data)]
    };
    console.log(py)
    let pyshell = new PythonShell('data_wrangle.py', options)
    console.log('creating promise')
    return new Promise((resolve, reject) => {
        console.log('waiting for pyshell')
        pyshell.on('message', function (msg) {
            console.log('got msg')
            console.log(msg)
            resolve(msg)
        })
    })
}