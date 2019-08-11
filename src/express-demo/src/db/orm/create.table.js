const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const test = sequelize.define('test', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.INTEGER,
    default: 1
  }
});

//如果是在已有表的基础上去进行操作，那么就需要声明表的数据结构，参考上面的建表操作，如果是已有表就不会重复建表

//此方法会先查询，如果查询到有此条数据相同的就不会新增，返回created:false，得到查询结果
test.findOrCreate({ where: { firstName: 'star', lastName: '37589' } })
  .spread((test, created) => {
    console.log(test.get({
      plain: true
    }))
    console.log('test table has ben created' + created)
  })
//第二种创建方法是直接创建，没有查询动作
test.create({
  firstName: 'star',
  lastName: '37589'
}).then(function (result) {
  console.log('inserted ok');
}).catch(function (err) {
  console.log('inserted error');
});

//模糊查询的相关知识请自行查资料~
test.destroy({
  where: {
    firstName: {
      [Op.like]: '%66%'//模糊查询
    }
  }
}).then(function (result) {
  console.log('destroy success');
  console.log(result);  //会返回操作了多少条数据
});


//查有无数种方式来实现，这里就讲几种主流的
//第一种：
test.findOne({ where: { firstName: 'sdepold' } }).then(item => {
  // project will be the first entry of the Projects table with the title 'aProject' || null
  console.log('这是查询得到的' + item.firstName)
})
//第二种
test.findById(123).then(item => {
  if (item) {
    console.log(item)
    //如果有id为123的row，会返回查找到的结果
  } else {
    console.log("没有找到结果")
  }
})
//第三种
test.findOne({
  where: { firstName: 'mary' },
  attributes: ['id', ['name', 'title']]
}).then(item => {
  //
})
//第四种，这一种主要是针对分页处理数据的情况，非常方便
test
  .findAndCountAll({
    where: {
      title: {
        [Op.like]: 'foo%'
      }
    },
    offset: 10,    //数据偏移量
    limit: 20      //每次查出的条数
  })
  .then(result => {
    console.log(result.count);
    console.log(result.rows);
  });
//第五种
test.findAll().then(item => {
  // 会返回所有数据
})


test.update({
  firstName: '12'
}, {
    where: {
      firstName: 'sdepold'
    }
  }).then(function (result) {
    console.log('updated success');
    console.log(result);
  })











