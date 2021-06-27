let eventBus = new Vue();

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template: `
    <div>
        <span class="tab" :class="{activeTab: selectedTab===tab}" v-for="(tab,index) in tabs":key="index" @click="selectedTab = tab">{{tab}}</span>
        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">There are no review yet</p>
            <ul v-else>
                <li v-for="review in reviews">
                    <p>name:{{review.name}}</p>
                    <p>review:{{review.review}}</p>
                    <p>rating:{{review.rating}}</p>
                </li>
            </ul>
        </div>
    <product-review v-show="selectedTab === 'Make a Review'"></product-review>
    </div>`,
  data: () => ({
    tabs: ["Reviews", "Make a Review"],
    selectedTab: "Reviews",
  }),
});
Vue.component("product-review", {
  template: `<form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b>Please correct the following error(s).</b>
            <ul>
                <li  v-for="error in errors">{{error}}</li>
            </ul>
        </p>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating" >
                <option> 1 </option>
                <option> 2 </option>
                <option> 3 </option>
                <option> 4 </option>
                <option> 5 </option>
            </select>
        </p>

        <p>
            <input type="submit" value="Submit">
        </p>

    </form>
    `,
  data: () => {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
    };
  },
  methods: {
    onSubmit: function () {
      this.errors.length = 0; // clearing the errors array
      if (this.name && this.review && this.rating) {
        const productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
        };
        eventBus.$emit("review-submit", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
      } else {
        if (!this.name) {
          this.errors.push("Name is required");
        }
        if (!this.review) {
          this.errors.push("Review is required");
        }
        if (!this.rating) {
          this.errors.push("Rating is required");
        }
      }
    },
  },
});
Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
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
      <button
        @click="addToCart"
        :disabled="quantity < 1"
        :class="quantity<1 && 'disabledButton'"
      >
        Add to Cart
      </button>
    </div>
    <product-tabs :reviews="reviews"></product-tabs>
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
        variantQuantity: 5,
      },
    ],
    reviews: [],
  }),
  methods: {
    addToCart: function () {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
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
    shipping() {
      if (this.premium) {
        return "free";
      }
      return 2.99;
    },
  },
  mounted() {
    eventBus.$on("review-submit", (review) => {
      this.reviews.push(review);
    });
  },
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart: function (id) {
      this.cart.push(id);
    },
  },
});

// v-bind one way binding
// v-model two way binding
