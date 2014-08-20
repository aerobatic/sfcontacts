A portal app for hackfests. Let's attendees post ideas, star their favorites, join teams, and share what they build. The app is built with AngularJS, Bootstrap, Firebase, and hosted on the [Aerobatic HTML5 cloud platform](http://www.aerobatic.io).

## Fork your own version
If you want to fork your own version of this app to play around with and extend, here's the steps to follow:

1. Sign-in to Aerobatic at https://aerobaticapp.com/auth/github
2. Click the __Create App__ button
3. Enter a name for your app
4. Rather than clone the aerobatic-starter app, clone this repo. Alternatively you could fork the repo and clone it.
```
git clone --depth 1 https://github.com/aerobatic/whowantstohack.git
```
5. Create the `.aerobatic` file as instructed.
6. Save the app.
7. Login to GitHub and create a new application.
8. In the __Homepage URL__ enter `https://<your_app>.aerobaticapp.com`.
9. For the __Authorization callback URL__ enter `https://<your_app>.aerobaticapp.com/auth/callback`
13. Copy the __Client ID__ and __Client Secret__ from GitHub and paste them in to the Security settings in Aerobatic. Make sure the OAuth dropdown is set to __GitHub__.
14. Open a terminal and `cd` to the directory where you cloned the repository.
15. Run `npm install & bower install`
16. Run `grunt sim --open` to launch your app in simulator mode and play around in the code.
17. When you're ready to push your changes to production, stop the simulator and run `grunt deploy --cowboy`.

## Running Tests
At a commannd run: `grunt test`
