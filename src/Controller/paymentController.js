const Stripe = require("stripe");
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY);



const payBoleto = async (req, res) => {


  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "brl",
      payment_method_types: ["boleto"],
      payment_method_data: {
        type: "boleto",
        boleto: {
          tax_id: req.body.cpf,
        },
        billing_details: {
          name: req.body.name,
          email: req.body.email,
          address: {
            line1: req.body.line1,
            city: req.body.city,
            state: req.body.state,
            postal_code: req.body.postal_code,
            country: req.body.country,
          }
        }
      },

      confirm: true,
      receipt_email: req.body.email
    });


    return res.json({
      boletoLink: paymentIntent.next_action.boleto_display_details.pdf,
      boletoNumber: paymentIntent.next_action.boleto_display_details.number,
      paymentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const payCard = async (req, res) => {
  const { amount, currency, email } = req.body;

  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: req.body.paymentMethod,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      confirm: true,
      receipt_email: email,
    });


    return res.json({
      paymentStatus: paymentIntent.status,
      paymentId: paymentIntent.id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { paymentId } = req.body;


  try {

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    
    if (paymentIntent.status === 'succeeded') {
      return res.json({
        success: true,
        message: 'Pagamento bem-sucedido!',
        paymentStatus: paymentIntent.status,
        paymentId: paymentIntent.id,
      });
    }
    return res.json({
      success: false,
      message: 'Pagamento não foi bem-sucedido.',
      paymentStatus: paymentIntent.status,
      paymentId: paymentIntent.id,
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};


const refund = async (req, res) => {
  const { paymentId } = req.body;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

  const charge = paymentIntent.latest_charge;
  
  try{
    stripe.refunds.create({
      charge,
    });

    return res.status(200).json({
      success: true,
      message: 'Reembolso bem-sucedido!',
    });
  }
  catch(error){
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  payBoleto,
  payCard,
  verifyPayment,
  refund
}