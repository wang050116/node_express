const notice = require('./data/model/notices');
/* 
notice.create({
  content: '我是公告内容。',
  title: '系统公告的标题',
  gmId: '10086',
  status: 0,
  expireDate: 1527396599123,
  startDate: Date.now()
}).then((data) => {
  console.log('add nontice data: ', JSON.stringify(data));
});

(async () => {
  var data = await notice.create({
    content: 'This is content',
    title: 'this is title',
    gmId: '10086',
    status: 0,
    expireDate: 1527396599123,
    startDate: Date.now()
  });
})();
*/

// notice.update({
//   status: 2
// }, {
//     where: { id: 6 }
//   });

// const list = notice.findAll().then(function (data) {
//   console.log('=====  Get all: ', JSON.stringify(data));
// });
const seq = require('sequelize');
const Op = seq.Op;
notice.findAll({
  order: [['createAt', 'DESC']], limit: 10,
  where: {
    'id':
      { [Op.lt]: 3 }
  }
}).then(function (data) {
  console.log('=====  get by condition: ', JSON.stringify(data));
});








