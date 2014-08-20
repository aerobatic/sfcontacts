Sample Salesforce contact manager app built on the [Aerobatic](http://www.aerobatic.io) HTML5 platform. You can see the app live at https://sfcontacts.aerobaticapp.com

## Fork your own version
If you want to fork your own version of this app to play around with and extend, here's the steps to follow:

1. Sign-in to Aerobatic at https://aerobaticapp.com/auth/github
2. Click the __Create App__ button
3. Enter a name for your app
4. Rather than clone the aerobatic-starter app, clone this repo. Alternatively you could fork it on GitHub then pull down your forked version.
```
git clone https://github.com/aerobatic/sfcontacts.git
```
5. Create the `.aerobatic` file as instructed.
6. Save the app.
7. Now login to Salesforce and create a new connected app. This [link](https://na17.salesforce.com/app/mgmt/forceconnectedapps/forceAppEdit.apexp) will take you straight there.
8. Check the __Enable OAuth Settings__ box
9. In the __Callback URL__ box enter `https://<your_app>.aerobaticapp.com/auth/callback` where `your_app` is the name you provided in step 3.
10. Add __Access and manage your data (api)__ to the list of selected scopes
11. In the __Start URL__ enter `https://<your_app>.aerobaticapp.com`.
12. Enter the other require fields and click Save.
13. On the following screen copy down the __Consumer Key__ and __Consumer Secret__.
14. Back in Aerobatic, click on the __Settings__ button on the right. On the settings screen scroll down to the __Security__ section. Change the __Authentication__ option to __OAuth__. Then select __Salesforce__ as the OAuth provider and paste in the __Client ID__ and __Client Secret__ (Client ID = Consumer Key, Client Secret = Consumer Secret). Finally check the __Require https__ box before clicking the __Update App__ button.
14. Open a terminal and `cd` to the directory where you cloned the repository.
15. Run `npm install & bower install`. This assume you have node installed. Once node is installed you can run `npm install -g bower`.
16. Run `grunt sim --open` to launch your app in simulator mode and play around in the code.
17. When you're ready to push your changes to production, stop the simulator and run `grunt deploy --cowboy`.

## Running Tests
At a commannd run: `grunt test`
