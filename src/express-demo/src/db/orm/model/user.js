// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.STRING(50),
//     primaryKey: true
//   },
//   name: Sequelize.STRING(100),
//   gender: Sequelize.BOOLEAN,
//   birth: Sequelize.STRING(10),
//   createdAt: Sequelize.BIGINT,
//   updatedAt: Sequelize.BIGINT,
//   version: Sequelize.BIGINT
// }, {
//     timestamps: false
//   });
const Sequelize = require('sequelize');
const config = require('../config');
var sequelize = new Sequelize(config.database, config.username
  , config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  });

var Pet = sequelize.define('pet', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  name: Sequelize.STRING(100),
  gender: Sequelize.BOOLEAN,
  birth: Sequelize.STRING(10),
  createdAt: Sequelize.BIGINT,
  updatedAt: Sequelize.BIGINT,
  version: Sequelize.BIGINT
}, {
    timestamps: false
  });
Pet.sync();
//写入数据
var now = Date.now();
(async () => {
  var dog = await Pet.create({
    id: 'd-' + now,
    name: 'haha',
    gender: false,
    birth: '2008-08-08',
    createdAt: now,
    updatedAt: now,
    version: 0
  });
  console.log('created: ' + JSON.stringify(dog));
})();


// 查询成功后会返回包含多个实例（instance）的数组。
var queryFromSomewhere = async (animals) => {
  var pets = await Pet.findAll({
    where: {
      name: animals || 'pig'
    }
  });
  console.log(`find ${pets.length} pets:`);
  for (let p of pets) {
    console.log(JSON.stringify(p));
  }
  return pets;

};

// 通过获取的示例进行数据更新
(async () => {
  try {
    var pets = await queryFromSomewhere("dog");
    for (let p of pets) {
      p.gender = true;
      p.updatedAt = Date.now();
      p.version++;
      await p.save();
    }
  } catch (err) {
    console.log(err);
  }
})();


// 通过获取的示例进行数据更新
(async () => {
  try {
    var pets = await queryFromSomewhere("rabbit");
    for (let p of pets) {
      await p.destroy();
    }
  } catch (err) {
    console.log(err);
  }
})();
