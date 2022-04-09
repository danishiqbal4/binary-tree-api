const path = require('path');
const fs = require('fs');

const RegisterController = (req: any, res: any, next: any) => {

    let status = null;
    let message = '';
    const data = req.body;

    const userFilePath = path.resolve(__dirname, '../data', 'user.json');
    let userFileObj = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));

    const treeFilePath = path.resolve(__dirname, '../data', 'tree.json');
    let treeFileObj = JSON.parse(fs.readFileSync(treeFilePath, 'utf8'));

    let userFileArr = userFileObj.users;

    //IF USER NAME EXISTS/NOT
    let user_name_exists = false;

    if(data.user_name){

        userFileArr.forEach((user: { [x: string]: any; }) => {

            if(user.user_name.toLowerCase() === data.user_name.toLowerCase()){
                user_name_exists = true;
            }

        });

        if(user_name_exists){
            res.status(200).json({
                "status": "error",
                "message": "Username already exists. Please register using a different username."
            });

            return;
        }

    } else {

        res.status(200).json({
            "status": "error",
            "message": "Please specify a username."
        });

        return;

    }

    //IF SPONSOR EXISTS/NOT
    let sponsor_user_name_exists = false;
    userFileArr.forEach((user: { [x: string]: any; }) => {

        if(user.user_name.toLowerCase() === data.sponsor_user_name.toLowerCase()){
            sponsor_user_name_exists = true;
        }

    });

    if(!sponsor_user_name_exists){
        res.status(200).json({
            "status": "error",
            "message": "This Sponsor does not exist. Please select a Sponsor that exists in the tree."
        });

        return;
    }

    //IF SPONSOR HAS DESIRED SPACE
    let sponsor_level: number = -1;
    let sponsor_level_index: number = -1;
    let left = "";
    let right = "";

    userFileArr.forEach((user: { [x: string]: any; }) => {

        if(user.user_name.toLowerCase() === data.sponsor_user_name.toLowerCase()){

            left = treeFileObj.tree[user.level][((user.level_index-1)*2)];
            right = treeFileObj.tree[user.level][((user.level_index-1)*2)+1];

            sponsor_level = user.level;
            sponsor_level_index = user.level_index;

        }

    });

    if(left !== '' && right !== ''){
        res.json({
            "status": "error",
            "message": "This Sponsor's both Left and Right positions are already filled. Please select a different Sponsor."
        });

        return;
    } else if(data.position == 'left'){
        if(left !== ''){
            res.json({
                "status": "error",
                "message": "This Sponsor's Left position is already filled. Please select Right position."
            });

            return;
        }
    } else if(data.position == 'right'){
        if(right !== ''){
            res.json({
                "status": "error",
                "message": "This Sponsor's Right position is already filled. Please select Left position."
            });

            return;
        }
    } else {
        res.json({
            "status": "error",
            "message": "Please specify a Right or Left position."
        });

        return;
    }

    // console.log(treeFileObj.tree[sponsor_level]);
    // return;

    //WRITE TREE FILE
    let user_level_index: number = -1;
    if(data.position == 'left'){
        treeFileObj.tree[sponsor_level][((sponsor_level_index-1)*2)] = data.user_name;
        user_level_index = (sponsor_level_index*2)-1;
    } else if(data.position == 'right'){
        treeFileObj.tree[sponsor_level][((sponsor_level_index-1)*2)+1] = data.user_name;
        user_level_index = sponsor_level_index*2;
    }

    if(typeof treeFileObj.tree[sponsor_level+1] === 'undefined'){
        treeFileObj.tree.push([]);

        const next_level_children = 2 ** (sponsor_level+1);
        
        for (let i = 0; i < next_level_children; i++) {
            treeFileObj.tree[sponsor_level+1].push("");
        }
    }

    treeFileObj = JSON.stringify(treeFileObj, null, 4);
    fs.writeFile(treeFilePath, treeFileObj, (err: any) => {
        if (err){
            return res.status(500).json({
                "status": "error",
                "message": "Unable to register user. Please try again."
            });
        }
    });


    //WRITE USER FILE
    const userObj = {
        name: data.name,
        user_name: data.user_name,
        sponsor_name: data.sponsor_user_name,
        position: data.position,
        level: sponsor_level+1,
        level_index: user_level_index
    };

    userFileObj.users.push(userObj);
    userFileObj = JSON.stringify(userFileObj, null, 4);

    fs.writeFile(userFilePath, userFileObj, (err: any) => {
        if (err){
            return res.status(500).json({
                "status": "error",
                "message": "Unable to register user. Please try again."
            });
        }
    });

    res.status(200).json({
        "status": "success",
        "message": "User registered successfully."
    });

    return;
}

module.exports = RegisterController;