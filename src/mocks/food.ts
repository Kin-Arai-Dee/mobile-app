import { IFood } from '../dto/food'

export const MOCK_FOOD: IFood = {
  foodId: '63fb385b8de7bcc026697454',
  createAt: '2023-02-27T18:35:19.329424',
  updateAt: '2023-02-27T18:35:19.329433',
  title: 'ผัดวุ้นเส้นกระเพราหมูกรอบ',
  url: 'https://www.wongnai.com/recipes/ugc/273249a7881248359acd7e8b7fabbe64',
  imageUrl:
    'https://img.wongnai.com/p/1968x0/2019/11/21/211ad6427eb74e2fa230531100e73689.jpg',
  allTimeScore: 1939,
  view: 1939,
  totalLike: 0,
  ingredients: [
    {
      ingredientName: 'วุ้นเส้น',
      amount: 1.0,
      unit: 'ซอง',
    },
    {
      ingredientName: 'หมูกรอบ',
      amount: 1.0,
      unit: 'cup',
    },
    {
      ingredientName: 'ใบกะเพรา',
      amount: 1.0,
      unit: 'cup',
    },
    {
      ingredientName: 'พริก',
      amount: 4.0,
      unit: 'เม็ด',
    },
    {
      ingredientName: 'กระเทียม',
      amount: 4.0,
      unit: 'lobe',
    },
    {
      ingredientName: 'ซีอิ๊วขาว',
      amount: 0.5,
      unit: 'table_spoon',
    },
    {
      ingredientName: 'น้ำตาล',
      amount: 1.0,
      unit: 'table_spoon',
    },
    {
      ingredientName: 'ผงปรุงรส',
      amount: 0.5,
      unit: 'table_spoon',
    },
    {
      ingredientName: 'น้ำเปล่า',
      amount: 2.125,
      unit: 'table_spoon',
    },
    {
      ingredientName: 'น้ำมัน',
      amount: 1.0,
      unit: 'table_spoon',
    },
  ],
  ingredientTags: [
    {
      externalId: 'pork-recipes',
      primaryName: 'เมนูหมู',
    },
  ],
  categories: [],
  methods: [
    {
      externalId: 'fried-recipes',
      primaryName: 'เมนูผัด',
    },
  ],
  isHealthy: false,
  calories: 0,
  isSpicy: 0,
  clusterId: 0,
}

export const MOCK_FOODS: IFood[] = [
  {
    foodId: '63fb385b8de7bcc026697455',
    createAt: '2023-02-27T18:35:19.329621',
    updateAt: '2023-02-27T18:35:19.329624',
    title: 'ไข่ตุ๋นมาม่า',
    url: 'https://www.wongnai.com/recipes/ugc/d2ca1bdc515a4d6990bee805f217c279',
    imageUrl:
      'https://img.wongnai.com/p/1968x0/2018/08/14/93f3f782a60344b2be052c1b6ae73dbf.jpg',
    allTimeScore: 1519,
    view: 1179,
    totalLike: 5,
    ingredients: [
      {
        ingredientName: 'ไข่ไก่',
        amount: 2.0,
        unit: 'buble',
      },
      {
        ingredientName: 'บะหมี่กึ่งสำเร็จรูป',
        amount: 1.0,
        unit: 'ก้อน',
      },
      {
        ingredientName: 'นม',
        amount: 0.5,
        unit: 'กล่อง',
      },
      {
        ingredientName: 'แครอท',
        amount: -1.0,
        unit: 'avg',
      },
      {
        ingredientName: 'กระดูกหมู',
        amount: -1.0,
        unit: 'avg',
      },
      {
        ingredientName: 'น้ำปลา',
        amount: 2.0,
        unit: 'tea_spoon',
      },
      {
        ingredientName: 'พริกไทย',
        amount: 1.0,
        unit: 'tea_spoon',
      },
    ],
    ingredientTags: [
      {
        externalId: 'egg-recipes',
        primaryName: 'เมนูไข่',
      },
    ],
    categories: [],
    methods: [
      {
        externalId: 'microwave-recipes',
        primaryName: 'เมนูไมโครเวฟ',
      },
    ],
    isHealthy: true,
    calories: 0,
    isSpicy: 0,
    clusterId: 1,
  },
]
