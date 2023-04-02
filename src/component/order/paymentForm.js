import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    ElementsConsumer,
  } from "@stripe/react-stripe-js"
  
  const StripeForm = ({ stripe, elements }) => {
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      if (!stripe || !elements) {
        return
      }
      const cardNumberElement = elements.getElement(CardNumberElement)
      console.log(cardNumberElement)
      const res = await stripe.createToken(cardNumberElement)
      console.log(res)
    }
  
    return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cardNumber">Card Number</label>
            <div>
              <CardNumberElement />
            </div>
          </div>
          <div>
            <label htmlFor="cardName">Card Name</label>
            <input
              type="text"
              name="cardName"
              required
              placeholder="Please Enter"
            //   pattern="[A-Za-z]"
            />
          </div>
          <div>
            <label htmlFor="expDate">Exp. Date</label>
            <div>
              <CardExpiryElement />
            </div>
          </div>
          <div>
            <label htmlFor="CVC">CVC</label>
            <div>
              <CardCvcElement />
            </div>
          </div>
          <button type="submit">enter</button>
        </form>
    )
  }
  
  const CardForm = () => {
    return (
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <StripeForm stripe={stripe} elements={elements} />
        )}
      </ElementsConsumer>
    )
  }
  
  export default CardForm