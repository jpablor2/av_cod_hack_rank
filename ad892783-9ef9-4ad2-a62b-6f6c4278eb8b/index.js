const fs = require('fs');

const path = require('path');
const rootFolder = path.resolve('.');

const getFileInfo = async (filePath) => {
    const statResult = await fs.promises.stat(filePath);
    const {size, birthtime: createdAt} = statResult;
    const fileName = path.basename(filePath);
    const isDirectory = statResult.isDirectory();
    const transformedFilePath = filePath.replace(rootFolder,'')
    const result = {
        fileName,
        filePath: transformedFilePath,
        size,
        isDirectory,
        createdAt
    };
    return result;
}

const main = async (filePath) => {
    try {
        const resultPromise = await fs.promises.stat(filePath);

        let results = [];
        const isDirectory = resultPromise.isDirectory();

        if(isDirectory) {
            const files = await fs.promises.readdir(filePath);
            promiseResult = files.map(file => {
                return getFileInfo(`${filePath}/${file}`);
            });
            Promise.all(promiseResult).then(values => {
                results.push(values)
            })
        } else {
            const getFileInfoResult = await getFileInfo(filePath);
            results.push(getFileInfoResult);
        }

        return new Promise((resolve, reject)=>resolve(results));

    } catch(error) {
        throw Error('Invalid Path');
    }
};

main(rootFolder+`/tmp/test_dir/test.txt`);

module.exports = main;
