# PaymentCard
a payment for implemeting ui taking mobile money, card etc...

# How to use the lib
`do npm i @enexus/payment-card`
# Import  the module
`FlipperPaymentCardModule`
# use the UI
`<flipper-payment-card app="Flipper" [showCard]="showCard" [currency]="currency" [amount]="flipperPlan"
                (formSaved)="submitCard($event)" [loading]="(loading | async)"
                [ccNumMissingTxt]="(ccNumMissingTxt | async)" [cardExpiredTxt]="(cardExpiredTxt | async)">
              </flipper-payment-card>`
              
