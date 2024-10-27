'use strict';
const { Entrie, User } = require('../models');
const { hashSync } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      { name: '123', email: '123@123', hashpass: hashSync('123', 10) },
      { name: 'aaa', email: 'aaa@mail.ru', hashpass: hashSync('aaa', 10) },
    ]);
    await Entrie.bulkCreate([
      {
        title: 'Острый Итальянский',
        body: 'Перед тобой классический сэндвич, приготовленный из кусочков пряной пеперони и салями, дополненный сливочным сыром. Хочешь сделать вкус еще более ярким? Приправь сэндвич растительным маслом, небольшим количеством винного уксуса и добавьте несколько кусочков острого перца халапеньо. Овощи, как всегда, на твой выбор.',
        img: '400_211_sayt_sabvey_ostr_it.png',
        userId: 2,
      },
      {
        title: 'Индейка',
        body: 'Нежная ветчина с индейкой и свежие овощи на твой выбор на свежевыпеченном хлебе в комбинации с твоим любимым соусом.',
        img: '400_211_sayt_sabvey_indeyka.png',
        userId: 2,
      },
      {
        title: 'Ветчина',
        body: 'ОЕще один низкокалорийный сэндвич. Гениальный в своей простоте. Сэндвич с нежной ветчиной с запеченным краем остается любимым сэндвичем многих наших посетителей.',
        img: '400_211_sayt_sabvey_vetchina.png',
        userId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Entrie.destroy({
      where: {
        id: { [Sequelize.Op.gt]: 0 },
      },
    });
  },
};
