<p align="center">

  <h3 align="center">Closr App</h3>
  <p align="center">
  <a href="https://closr-app.herokuapp.com/">https://closr-app.herokuapp.com/</a>
  </p>
  <br />
  <p align="center">This project has been created by the Spring 2021 full-time cohort at Parsity, an online software engineering course. The work in this repository is wholly of the students based on a project prompt given by Parsity instructors. 
  <br />The application is an online customer relationship management tool that helps companies track customers, deals and revenue.</p>
  
  <p align="center">
    <br />
    <a href="https://github.com/connordipietro/closr/issues">View Open Issues</a>
    ·
    <a href="https://github.com/connordipietro/closr/issues">Report Bug</a>
    ·
    <a href="https://github.com/connordipietro/closr/issues">Request Feature</a>
  </p>
</p>

<br />

<p align="left">
<h3 align="left"><strong>About The Project</strong></h3>
</p>

### Functionality

* The dashboard displays sales and deals data, based on all time deals history.
* The companies tab shows all companies, with ability to click on a company and view additional information, it's associated deals and navigate to the deals' pages.
* The deals tab has integrated drag&drop functionality, to effectively move deals from one stage to another and archive won or lost deals. The user can also click and view the deal's details, timeline and edit/delete/archive the deal.

### Built With

* [React](https://jquery.com)
* [Redux](https://react-redux.js.org/)
* [Node](https://nodejs.org/en/)
* [Mongoose](https://mongoosejs.com/)
* [Express](https://expressjs.com/)
* [Bootstrap](https://getbootstrap.com)

### Deployed With

* [Heroku](https://devcenter.heroku.com/)

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/connordipietro/closr
   ```
2. Install NPM packages in root directory
   ```sh
   npm install
   cd -
   ```
3. Install NPM packages in Client
   ```sh
   cd client
   npm install
   ```
4. Go to BigPicture.io -> https://bigpicture.io/pricing and generate your free API key
5. Create an .env file in the Client folder and add the following text in it: REACT_APP_BIGPICTURE_API_KEY = "insert the API key you created"
6. Add the .env file to your .gitignore

 ## Contributing

Any contributions you make are appreciated!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b newFeature`)
3. Commit your Changes (`git commit -m 'Add a newFeature'`)
4. Push to the Branch (`git push origin newFeature`)
5. Open a Pull Request
  
 
