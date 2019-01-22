This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run it locally you need to create a `.env` file and specify the following key value pairs:

```
GOOGLE_API=<YOUR_GOOGLE_API_KEY_HERE>
DARKSKY_API=<YOUR_DARKSKY_API_KEY_HERE>
SERVER_PORT=8080
PORT=3000
```

If you change SERVER_PORT to any other value, don't forget to update `"proxy":"http://localhost:8080"` in `package.json`

To obtain the Darksky API key please register at [https://www.darksky.net](https://www.darksky.net).
To obtain Google Geocode API key please follow the steps in this quick guide: [https://developers.google.com/maps/documentation/geocoding/get-api-key](https://developers.google.com/maps/documentation/geocoding/get-api-key)

Don't forget to run `npm install` before using the following scripts :)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs just the API proxy on the port you specify.

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
