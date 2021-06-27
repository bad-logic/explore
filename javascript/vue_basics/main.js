Vue.component("product", {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `<div class="product">
    <div class="product-image">
      <img v-bind:src="image" :alt="alternativeText" />
    </div>
    <div class="product-info">
      <h1>{{title}}</h1>
      <p v-if="quantity > 10">In Stock</p>
      <p v-else-if="quantity > 0 && quantity <= 10">Almost sold out</p>
      <p
        v-else
        :style="{'text-decoration': quantity<1 && 'line-through'}"
      >
        Out of Stock
      </p>
        <p>Shipping: {{shipping}}</p>
      <ul>
        <li v-for="detail in details">{{detail}}</li>
      </ul>
      <div
        v-for="(variant,index) in variants"
        v-bind:key="variant.variantId"
        class="color-box"
        :style="{backgroundColor: variant.variantColor}"
        v-on:mouseover="onColorHover(index)"
      ></div>
    </div>
    <button
      @click="addToCart"
      :disabled="quantity < 1"
      :class="quantity<1 && 'disabledButton'"
    >
      +
    </button>
    <div class="cart">
      <p>{{cart}}</p>
    </div>
    <button
      @click="removeFromCart"
      :disabled="quantity < 1"
      :class="quantity<1 && 'disabledButton'"
    >
      -
    </button>
  </div>`,
    data: () => ({
        brand: "Vue Mastery",
        product: "Socks",
        selectedVariant: 0,
        alternativeText: "greeen socks",
        details: ["80% cotton", "20% polyster", "gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./public/assets/green-socks.jpg",
                variantQuantity: 10,
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./public/assets/blue-socks.jpg",
                variantQuantity: 0,
            },
        ],
        cart: 0,
    }),
    methods: {
        addToCart: function () {
            this.cart += 1;
        },
        onColorHover: function (index) {
            this.selectedVariant = index;
        },
        removeFromCart: function () {
            if (this.cart > 0) {
                this.cart -= 1;
            }
        },
    },
    computed: {
        title: function () {
            return this.brand + " " + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        quantity: function () {
            return this.variants[this.selectedVariant].variantQuantity;
        },

    },
});

var app = new Vue({
    el: "#app",
    data: {
        premium: true
    }
});
