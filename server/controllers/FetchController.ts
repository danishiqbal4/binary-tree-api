const fc_path = require('path');
const fc_fs = require('fs');

const FetchAll = (req: any, res: any, next: any) => {

    const userFilePath = fc_path.resolve(__dirname, '../data', 'user.json');
    const userFileObj = JSON.parse(fc_fs.readFileSync(userFilePath, 'utf8'));
    const data = userFileObj.users;

    const user_name_mapping = data.reduce((acc:any, user:any, i:number) => {
        acc[user.user_name] = i;
        return acc;
    }, {});

    let root:any;
    data.forEach((user:any) => {
        if (user.sponsor_user_name === null) {
            root = user;
            return;
        }

        const parentEl = data[user_name_mapping[user.sponsor_user_name]];
        parentEl.children = [...(parentEl.children || []), user];
    });

    res.send(root);

}

const FetchUserTree = (req: any, res: any, next: any) => {
    
    const userFilePath = fc_path.resolve(__dirname, '../data', 'user.json');
    const userFileObj = JSON.parse(fc_fs.readFileSync(userFilePath, 'utf8'));
    const data = userFileObj.users;

    const user_name = req.params.sponsor_user_name;
    const levels = parseInt(req.params.levels);

    let root:any;
    const user_name_mapping = data.reduce((acc: any, user: any, i: any) => {
        acc[user.user_name] = i;
        if (user.user_name === user_name) {
            root = user;
        }
        return acc;
    }, {});

    data.forEach((user: any) => {
        if (user.sponsor_user_name === null) {
            user.depth = 1;
            return;
        }

        const parentEl = data[user_name_mapping[user.sponsor_user_name]];

        user.depth = parentEl.depth + 1;

        if (!root.depth || user.depth > root.depth + levels) {
            return;
        }

        parentEl.children = [...(parentEl.children || []), user];
    });

    res.json(root);

}

module.exports = {
    FetchAll,
    FetchUserTree
};