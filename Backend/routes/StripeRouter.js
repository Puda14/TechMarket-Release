const express = require("express");
const Stripe = require("stripe");
const userService = require("../services/UserService");
const orderService = require("../services/OrderService");
const productService = require("../services/ProductService");
const Order = require("../models/order");
const mongoose = require("mongoose");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();
let lineItemsData;

router.post("/create-checkout-session", async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId,
      },
    });

    id = userId;
    cart = cartItems;

    const line_items = await Promise.all(
      cartItems.map(async (item) => {
        const product = await productService.getProductById(item.id);
        return {
          price_data: {
            currency: "vnd",
            product_data: {
              name: product.name,
              images: product.image ? [product.image.url] : [],
              description: product.desc,
              metadata: { id: product._id.toString() },
            },
            unit_amount: product.price,
          },
          quantity: item.quantity,
        };
      })
    );

    lineItemsData = line_items.map(item => ({
      id: item.price_data.product_data.metadata.id,
      quantity: item.quantity
    }));

    // console.log("lineItems: " + JSON.stringify(lineItems, null, 2));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "VN"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "vnd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 100000,
              currency: "vnd",
            },
            display_name: "Express",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      customer: customer.id,
      line_items,
      mode: "payment",
      metadata: {
        userId: userId,
        cartItems: JSON.stringify(cartItems.map((item) => ({ id: item.id }))),
      },
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });
    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating Stripe session: " + error.message);
  }
});

// Create Order
const createOrder = async (customer, data, lineItemsData) => {
  const newOrder = new Order({
    userId: new mongoose.Types.ObjectId(customer.metadata.userId),
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: lineItemsData,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });
  console.log("newOrder", newOrder);
  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

// This is your Stripe CLI webhook secret for testing your endpoint locally.
// let endpointSecret =
//   "whsec_6e26d738ca35bc8c68b36166e1d52972955fd7ec45423e08cdd6331d1eabf4a4";

let endpointSecret;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;
    let event;

    if (endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(
          req.body, // Changed from `request.body` to `req.body`
          sig,
          endpointSecret
        );
        console.log("Webhook verified.");
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      const session = req.body.data.object;
      const user = await userService.getUserById(session.metadata.userId);

      const cartItems = JSON.parse(session.metadata.cartItems);
      const cartProductIds = cartItems.map((item) => item.id);

      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          stripe.checkout.sessions.listLineItems(
            data.id,
            {},
            function (err) {
              if (err) {
                console.log(err);
                return;
              }
              console.log("lineItemData: " + lineItemsData,);
              createOrder(customer, data, lineItemsData);
            }
          );
        })
        .catch((err) => console.log(err.message));


      // console.log(cartProductIds);
      // const updatedCartItems = user.cart.filter(
      //   (productId) => !cartProductIds.includes(String(productId))
      // );
      // console.log(updatedCartItems);

      // user.cart = updatedCartItems;
      // await user.save();
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  }
);

module.exports = router;
