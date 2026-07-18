export const categories = [
  {
    name: 'Пиццы'
  },
  {
    name: 'Завтрак'
  },
  {
    name: 'Закуски'
  },
  {
    name: 'Коктейли'
  },
  {
    name: 'Кофе'
  },
]
export const _ingredients = [
  {
    name: 'Сырный бортик',
    price: 179,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
  },
  {
    name: 'Сливочная моцарелла',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
  },
  {
    name: 'Сыры чеддер и пармезан',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
  },
  {
    name: 'Острый перец халапеньо',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
  },
  {
    name: 'Нежный цыпленок',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
  },
  {
    name: 'Шампиньоны',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
  },
  {
    name: 'Бекон',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
  },
  {
    name: 'Ветчина',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
  },
  {
    name: 'Пикантная пепперони',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
  },
  {
    name: 'Острая чоризо',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
  },
  {
    name: 'Маринованные огурчики',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
  },
  {
    name: 'Свежие томаты',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
  },
  {
    name: 'Красный лук',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
  },
  {
    name: 'Сочные ананасы',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
  },
  {
    name: 'Итальянские травы',
    price: 39,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
  },
  {
    name: 'Сладкий перец',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
  },
  {
    name: 'Кубики брынзы',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
  },
  {
    name: 'Митболы',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
  },
].map((obj, index) => ({id: index + 1, ...obj}))
export const products = [
  {
    name: 'Омлет с ветчиной и грибами',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/019b12c7353b76d988cab1310b627eb4.avif',
    categoryId: 2
  },
  {
    name: 'Омлет с пепперони',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/019b12cf2f6a74b481d7b46e844d1b78.avif',
    categoryId: 2
  },
  {
    name: 'Хашбрауны',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/01981875ae8e75239a409d63775530d8.avif',
    categoryId: 2
  },
  {
    name: 'Сырники со сгущенным молоком',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/01980d419be874a5abd2ce54dcac236f.avif',
    categoryId: 2
  },
  {
    name: 'Покет-пицца Чилл Грилл',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/019d9b1c1ec7763f89812f1fb7136b28.avif',
    categoryId: 3
  },
  {
    name: 'Куриные наггетсы',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/0198131dce8b706bb3ed5a169df1bc84.avif',
    categoryId: 3
  },
  {
    name: 'Креветки',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/01980e9159aa74ca93e7daaa7db3e9fd.avif',
    categoryId: 3
  },
  {
    name: 'Додстер',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/01980cb92528769295aeb186fb501f8e.avif',
    categoryId: 3
  },
  {
    name: 'Молочный коктейль Соленая карамель',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/019c60b630ae700bb90b437adf09e334.avif',
    categoryId: 4
  },
  {
    name: 'Молочный коктейль с печеньем Орео',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/019986496b5276b89f66e83aa460d5b3.avif',
    categoryId: 4
  },
  {
    name: 'Молочный коктейль Фисташка',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/0199864a85b9709d9de7c79c3375f4e7.avif',
    categoryId: 4
  },
  {
    name: 'Классический молочный коктейль',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/019880d9a81873129e7300a65203f39b.avif',
    categoryId: 4
  },
  {
    name: 'Кофе Латте',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/019a6e83730c71beb07db34a0442c526.avif',
    categoryId: 5
  },
  {
    name: 'Холодный бамбл кофе',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/019a08a9252276779f0c1ae14d5f53b8.avif',
    categoryId: 5
  },
  {
    name: 'Айс капучино',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/01998646760c7153aab39d4f7c7e7541.avif',
    categoryId: 5
  },
  {
    name: 'Кофе Американо',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/01989addcc7274898f72b92f5edbb1e9.avif',
    categoryId: 5
  },
]