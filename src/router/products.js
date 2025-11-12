export default [
    {
        path: '/products',
        name: 'products.index',
        component: () => import('../views/products/Index.vue'),
        meta: {
            heading: {
                name: 'Productos',
                description: 'Listado de productos'
            },
            page: {
                hide_back_button: true
            }
        }
    },
    {
        path: '/products/create',
        name: 'products.create',
        component: () => import('../views/products/Create.vue'),
        meta: {
            heading: {
                name: 'Crear producto',
                description: 'Crear producto'
            }
        }
    },
    {
        path: '/products/:_id/edit',
        name: 'products.edit',
        component: () => import('../views/products/Edit.vue'),
        meta: {
            heading: {
                name: 'Modificar producto',
                description: 'Modificar producto'
            }
        }
    }
]