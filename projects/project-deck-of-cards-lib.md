# Project: Deck of Cards Library
This library should define a class that represents a deck of cards. It should include a helper class that represents a card. 

You're jobe is to create the classes described below with the API (Application Programming Interface) that allows a prorgrammer to work with a deck and cards to simulate card games.

## Background 
To understand what you are making you need to understand what a deck of cards is. If you're not familiar a deck of cards is a collection of 52 or 54 cards. There are four suits: Clubs, Diamonds, Hearts, and Spades. Each card has a value and a suit. There are thirteen cards in each suit ranging in value from 1 to 10. Some of the cards are named: Ace, King Queen, Jack. There are two colors: Red (Diamonds and Hearts) and Black (Clubs and Spades). In most games Face cards have a value of 10, while the Ace has a value of 1. In some games an Ace is worth 11. 

Read more about the 52 card deck: https://en.wikipedia.org/wiki/Standard_52-card_deck

Here are the assumptions:
- a deck has 52 cards with the option of adding two jokers in which case there are 54 cards the deck is an array of cards
- Every card has a suit hearts clubs diamonds and spades a value and a numeric value 
- We need to be able to randomize the cards in the deck
- Draw a card from the deck
- Discard a card the discard pile is an array of cards

## Deck Class
Can be initialized with these options:
- `new Deck(hasJokers)`
- Property `deck` Array
- Property `discardPile` Array

with the following methods:
- `shuffle()` - randomized the deck
- `draw()` - returns the card at index 0 and removes that from the deck
- `discard(card)` - adds card to `discardPile` 
- `addCard(card)` - adds a card to the top of the `deck`
- `shuffleCard(card)` - adds card to `deck` and shuffles the `deck`
- `slipCard(card)` - adds card to the bottom of the `deck`
- `reveal()` - reveals the top card of the `deck`

## Card Class
Initializer
- `aceIsEleven` - is a bollean that sets the value of an Ace to eleven when true, otherwise an Ace is 1. 

Collaborating classes: Card has these properties:
- `suit`
- `value`
- `color`

And these methods:
- `toString()` - returns a string reorientation of the card. 
- `toValue()` - returns the numeric value of a card. 
- `toEmoji()` - returns an emoji representation of the card.

## Use TDD 
You can imagine how this class might function with some hypothetical unit tests. 

```JS
test('Deck has 52 cards', () => {
  const deck = new Deck()
  expect(deck.deck.length).toBe(52)
})

test('Deck discard is empty', () => {
  const deck = new Deck()
  expect(deck.discardPile.length).toBe(0)
})

test('Deck can draw a card', () => {
  const deck = new Deck()
  const card = deck.draw()
  expect(deck.deck.length).toBe(51)
  expect(card).toBeInstanceOf(Card)
})
```

## Test app
Your submitted homework should inlcude a test app that shows your code in action. The test should import your code to a react Project with npm. Your test app does not have to be complex, the goal is to show your library functioning in context, not creating complex comercial project. 

## Evaluation
| Category | Points |
|:---------|:-------|
| Code & function | 10 |
| Test App        | 10 |
| Uses Typescript |  5 |
| Has Unit Tests  |  5 |
| Uses Bundling   |  3 |
| Uses CI         |  2 |
| Total           | 35 |

<!-- | Expectations | Does not meet | Meets | Exceeds |
|:-------------|:--------------|:------|:--------|
| **_Completion_** | < 100% of functions written | All functions written | Includes all stretch functions, comments, and documentation |
| **_Quality_** | Code is sloppy and/or throws errors | Code is well written with no errors | Considers edge cases |
| **_Comprehension_** | Can't explain the code written | Can explain the code | Could write the code again from scratch | -->
