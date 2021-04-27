import { createSelector } from 'reselect';

// INPUT SELECTORS
// Semplici funzioni che restituiscono una parte dello stato in Store
export const selectCartHidden = state => state.cart.hidden;
export const selectCartIsFetching = state => state.cart.isFetching;
export const selectCartDbError = state => state.cart.dbError;
export const selectCartItems = state => state.cart.cartItems;

// OUTPUT SELECTORS -> MEMOIZED SELECTORS
export const selectCartItemsCount = createSelector(
	[selectCartItems],
	cartItems =>
		cartItems.reduce(
			(accumulator, cartItem) => accumulator + cartItem.quantity,
			0
		)
);

export const selectCartTotal = createSelector([selectCartItems], cartItems =>
	cartItems.reduce(
		(accumulator, cartItem) => accumulator + cartItem.quantity * cartItem.price,
		0
	)
);

/* 
HOW?
Il primo argomento di createSelector() è un array di input selectors
Il secondo argomento è una funzione che riceve in ingresso tutti gli output restituiti dagli input selectors. Tale funzione è un selector a sua volta, ma è memoizzata!
La memoizzazione è basata sul risultato degli input selectors: se il valore di tali input è variato rispetto alla cache, allora viene eseguita la funzione nel secondo argomento, altrimenti viene restituito lo stato precedente.

WHY?
-- La memoizzazione è utile in due casi --
1. evitare che il componente sia ri-renderizzato inutilmente
2. evita l'esecuzione di selettori molto complessi senza motivo
-- REDUX --
Ogni volta che lo stato globale in Store varia, vengono evocate tutte le funzioni mapStateToPros in ogni componente, anche se contengono selettori a parti dello stato che non sono state variate.
-- REDUX - Memoizzazione di base --
Redux include una implementazione nascosta della memoizzazione: prima di ri-renderizzare un componente redux controlla sempre se il valore restituito dal selettore è cambiato o meno.
-- RESELCT --
CASO 1:
La memoizzazione automatica di Redux non funziona con molte funzioni degli array (map, filter, concat, slice) e con lo spread operator ({...array1, item}), in quanto restituiscono un array con una reference diversa. In questi casi è sempre opportuno usare createSelector() della lib reselect.
CASO 2:
Nel nostro caso, l'output di reduce() è un intero, quindi la memoizzazione base di redux basterebbe ad evitare il ri-rendering. Tuttavia, vogliamo evitare che reduce() venga rieseguita inutilmente, in quanto potrebbe peggiorare le performance.
*/
