# Car Auction Frontend
This is the frontend of a school project in which you can buy and sell cars on auctions. See also [the backend](https://github.com/williameliasson/car-auction-backend).

[Deployed site](https://cars.williameliasson.com/)

## About
Create and bid on user's auctions of used cars. Each bid is binding, as it locks the required balance from the bidder's balance. These funds will stay locked until one of two things happen: 1. The bid was outbid by another user. 2. The auction passed its deadline. In the second case, it then automatically transfers the bid's amount in SEK to the auction owner. The user can still bid on other auctions with the remaining available balance in their account. View your Balance and Available balance on the account page.

The bids are sent live to the client via websockets, to provide accurate and up to date information while bidding. There are cases where a bid cannot be accepted, e.g. if the user's available balance is lower than the bids size. In such cases, the server responds with a bid error code. This code is used in the frontend to display a human readable error message.

## Features
* Register and login user. Session based authentication via spring security.
* Create auctions, which include a rough value range from OpenAI API, based on the described vehicle description and information.
* Top up account balance with Stripe (sandbox mode).
* Bid on other user's auctions.
* Pseudonymous bidding. The users cannot see the usernames of other bidders of an auction.

## Installation
1. Make sure you have [Angluar CLI](https://angular.dev/tools/cli) installed.
2. Open a terminal and navigate to the project root.
3. Run `npm install; ng serve --configuration development`.
4. The application should now be running.

## Tech used
* Angular
* Websockets

## AI-usage and sources
When developing the project, AI was used to aid in understanding errors found when building the project. The design choices, all the code and solutions were made by me. 

There are some parts of the code where I have taken inspiration from other sources found online. Where that is the case, I have written a comment `// Src: {URL}` to show this.

## Roadmap
* Pagination of getting the auctions, to not have to fetch every single one every time.
* Allow for users to upload their own images for their auctions.
* New entity for storing transactions between users, so that they can verify that they have been paid for their ended auctions.
* Some way for users to also withdraw their funds.

## Known issues
* The text showing the current available balance does not update if the user's bid on another auction was outbid, causing that bid amount to be unlocked.
* CSRF is not configured.
* The button for creating an auction can be pressed twice and produces duplicate auctions (but can get different valuations, funny enough). The solution for this is to lock the button after a single press, wait for response, and if theres an error in the response, only then unlock the button to be pressed again.
* Registration, Login and creating an auction does not show the user what went wrong in case of an error with the POST request.
