# Nordic Art Archive
# Nordic Art Archive

Nordic Art Archive is a responsive front-end web application built with HTML, CSS, and Vanilla JavaScript. The application uses the Noroff API to let users browse artworks, view artwork details, and, when logged in as an owner, create, edit, and delete artwork entries.

## Live Site

[Live Demo](https://nordic-art-archive.netlify.app/)

## GitHub Repository

[GitHub Repository](https://github.com/snezanakg/Nordic-Art-Archive)

## Figma

[Figma Style Guide and Prototypes](https://www.figma.com/design/toEtRJMN1nOCadugIZQcuj/Nordic-Art-Archive?node-id=0-1&t=BYPX2Ffyv0lHRRgT-1)

## GitHub Project Board

[Project Board] (https://github.com/users/snezanakg/projects/7)


## Project Description

This project was developed as part of Exam Project 1 Resit 1. The goal was to create a front-end interface for an artworks management application using the Noroff API.

Users can:
- browse artworks on the homepage
- view a specific artwork in more detail
- register and log in
- create new artwork entries when logged in
- edit and delete their own artwork entries

## Features

- Responsive homepage with artwork gallery
- Artwork detail page
- User registration
- User login
- Protected create artwork page
- Protected edit artwork page
- Delete artwork functionality
- Client-side form validation
- Loading states and feedback messages
- API integration with Noroff API
- Responsive design for desktop and mobile

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Noroff API
- Netlify
- Figma
- GitHub Projects

## API

This project uses the Noroff v2 API for:
- authentication
- API key creation
- artworks CRUD operations

Main endpoints used:
- `GET /artworks`
- `GET /artworks/:id`
- `POST /artworks`
- `PUT /artworks/:id`
- `DELETE /artworks/:id`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/create-api-key`

## Folder Structure

```txt
.
├── index.html
├── js
│   ├── api.js
│   ├── artwork-detail.js
│   ├── auth.js
│   ├── create-artwork.js
│   ├── edit-artwork.js
│   ├── gallery.js
│   ├── main.js
│   ├── ui.js
│   └── utils.js
├── pages
│   ├── artwork-detail.html
│   ├── create-artwork.html
│   ├── edit-artwork.html
│   ├── gallery.html
│   ├── login.html
│   └── register.html
└── styles
    └── style.css
 
 Installation and Local Setup
Clone the repository:
git clone PASTE_YOUR_GITHUB_REPO_LINK_HERE
Open the project folder in VS Code.
Run the project using Live Server or another local server.

Example with Live Server:

Right-click index.html
Choose Open with Live Server
How to Use
Visitor
Browse artworks on the homepage
Click an artwork to open the detail page
Register for a new account
Log in to access owner features
Logged-in Owner
Create a new artwork
Edit owned artwork entries
Delete owned artwork entries
Log out when finished
Validation and Quality Checks

The project was tested for:

HTML validation
accessibility using Lighthouse
SEO using Lighthouse
responsive layouts across desktop and mobile
user flows including register, login, create, edit, and delete
User Stories Covered
View a grid of artworks
Click an artwork to view more details
Register an account
Log in to access owner features
Create new artwork entries
Edit owned artwork entries
Delete owned artwork entries
Design

The design was based on a Nordic-inspired visual identity with:

dark blue gradient backgrounds
glassmorphism-inspired cards and header
high-contrast typography
responsive layout for mobile and desktop



Author

Snezana Kragujevac

Acknowledgments
Noroff API Documentation
Noroff course resources
Figma for design and prototyping