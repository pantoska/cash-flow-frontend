export default class CategoryController {
    static getCategoryAndSubcategory () {
        return [
            {
                categoryId: 1,
                name: 'Jedzenie i picie',
                color: '#FF00BB',
                colorId: 1,
                is_income: false,
                subcategory: [
                    {
                        subcategoryId: 1,
                        name: 'Spozywka'
                    },
                    {
                        subcategoryId: 2,
                        name: 'Napoje'
                    },
                    {
                        subcategoryId: 3,
                        name: 'Naboje'
                    },
                    {
                        subcategoryId: 4,
                        name: 'Słodycze'
                    }
                ]
            },
            {
                categoryId: 2,
                name: 'Jedzenie i picie2',
                color: '#FF00BB',
                colorId: 1,
                is_income: true,
                subcategory: [
                    {
                        subcategoryId: 5,
                        name: 'Spozywka2'
                    },
                    {
                        subcategoryId: 6,
                        name: 'Napoje2'
                    },
                    {
                        subcategoryId: 7,
                        name: 'Naboje2'
                    },
                    {
                        subcategoryId: 8,
                        name: 'Słodycze2'
                    }
                ]
            },
            {
                categoryId: 3,
                name: 'Paździeż',
                color: '#FF00BB',
                colorId: 1,
                is_income: false,
                subcategory: [
                    {
                        subcategoryId: 9,
                        name: 'Gumowy'
                    },
                    {
                        subcategoryId: 10,
                        name: 'Filcowy'
                    },
                    {
                        subcategoryId: 11,
                        name: 'Papierowy'
                    },
                    {
                        subcategoryId: 12,
                        name: 'Słodycze'
                    }
                ]
            }
        ]
    }
}

// let tworzeniePodkategorii = {
//   name:"Nowa Subkategoria",
//   categoryId:1 // id kategorii
// }
//
// let edycjakategorii = {
//   subcategoryId: 1, // id subkategorii
//   name:"Nowa Subkategoria",
//   categoryId:1 // id kategorii - tutaj nie będzie można jej modyfikować
// }
