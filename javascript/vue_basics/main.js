var app = new Vue({
    el: "#app",
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        // image: './public/assets/green-socks.jpg',
        // quantity: 5,
        selectedVariant: 0,
        alternativeText: 'greeen socks',
        details: ['80% cotton', '20% polyster', 'gender-neutral'],
        variants: [{
            variantId: 2234,
            variantColor: 'green',
            variantImage: './public/assets/green-socks.jpg',
            variantQuantity: 10
        }, {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: './public/assets/blue-socks.jpg',
            variantQuantity: 0
        }],
        cart: 0,
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        onColorHover: function (index) {
            this.selectedVariant = index;
        },
        removeFromCart: function () {
            if (this.cart > 0) {
                this.cart -= 1

            }
        },
    },
    computed: {
        title: function () {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        quantity: function () {
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
})