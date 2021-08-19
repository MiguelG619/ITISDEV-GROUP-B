const db = require('./models/db.js');

// const url = 'mongodb://localhost:27017/itisdev-instock';
const url = 'mongodb+srv://draco:nAG5fKmyDbDqsUS5@itisdev-in-stock.mjmm5.mongodb.net/inventory?retryWrites=true&w=majority';

const User = require('./models/UserModel.js');

db.connect(url);

/* TO DO LIST
    - bcrypt for hashing
    - user authentication
    - user session
*/

async function createUser(firstName, lastName, email, password, role) {
    console.log('Adding user ' + email + ' to ' + url + '...');

    const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role
    })

    const result = await user.save();
    console.log(result);
}

async function listUsers() {
    const users = await User
        .find()
        .select('firstName email role');
    console.log(users);
}

createUser('Manjiro', 'Sano', 'm.sano@gmail.com', 'password123', "sales manager");
createUser('Ken', 'Ryuguji', 'k.ryuguji@gmail.com', 'password234', 'cashier');
createUser('Takemichi', 'Hanagaki', 't.hanagaki@gmail.com', 'password345', 'purchasing');

listUsers();