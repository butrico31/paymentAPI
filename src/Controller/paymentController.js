const Stripe = require("stripe");
const stripe = Stripe('sk_test_51Qsu2tKgJMpML8VgvFXRG60r3i8rL7f6BAkzm3VwD2hH5xRbeDKs62fmFhYY8mue80OlxVMuBJLR7dm0d9E78Uja00Ae9wZG2J');



const payBoleto = async (req, res) =>{

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
              address:{
                line1:req.body.line1,
                city: req.body.city,
                state: req.body.state,
                postal_code: req.postal_code,
                country: req.body.country,
              }
            }
        },
        
        confirm: true,
        receipt_email: email
    });

    res.json({ 
      boletoUrl: paymentIntent.next_action.boleto_display_details.pdf,
      boletoNumber: paymentIntent.next_action.boleto_display_details.number
    });
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

const payCheckout = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1QtAfUKgJMpML8VgcVEKBzPV', 
          quantity: 1, 
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/auth/success.html',
      cancel_url: 'http://localhost:3000/auth/cancel.html', 
    });

    res.json({ success: true, sessionUrl: session.url });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = {
  payBoleto,
  payCheckout,
}