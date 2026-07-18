import {FC} from 'react';
import {
  CheckoutItem,
  RemoveAllCartButton,
  WhiteBlock,
  SkeletonCheckoutCart,
  EmptyCartButton
} from "@/shared/components";
import {getCartItemDetails} from "@/shared/lib";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {CartStateItem} from "@/shared/lib/getCartDetails";

interface Props {
  items: CartStateItem[],
  totalAmount?: number
  loading: boolean
  className?: string;
  removeCartItem: (id: number) => void,
  removeAllCart: () => void,
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void,
}

export const CheckoutCart: FC<Props> = ({
  className,
  removeCartItem,
  items,
  onClickCountButton,
  removeAllCart,
  loading,
  totalAmount
}) => {

  return (
    <WhiteBlock
      title='1. Корзина'
      className={className}
      endAdornment={<RemoveAllCartButton removeAllCart={removeAllCart} loading={loading}/>}
    >
      <div className='flex flex-col gap-5'>
        {!totalAmount && !loading && <EmptyCartButton isCheckout={true}/>}
        {loading && items.length < 1 && [...Array(3)].map((_, index) => <SkeletonCheckoutCart key={index}/>)}

        {items.length > 0 && items.map((item) => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            details={getCartItemDetails(
              item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize
            )}
            name={item.name}
            price={item.price}
            loading={item.loading}
            quantity={item.quantity}
            onClickRemove={() => removeCartItem(item.id)}
            onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
          />
        ))

        }

      </div>
    </WhiteBlock>
  );
};