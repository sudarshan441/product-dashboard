# 🛍️ Product Dashboard App

A frontend product dashboard built with **React**, **Redux Toolkit**, **Vite**, and tested using **Vitest** and **React Testing Library**. This app displays products from [Fake Store API](https://fakestoreapi.com) and allows users to mark favorites.

---

## 🚀 Live Demo

👉 [https://product-dashboards.netlify.app/](https://product-dashboards.netlify.app/)

---

## 🧰 Tech Stack

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Cypress](https://www.cypress.io/)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/product-dashboard.git
cd product-dashboard
npm install
```

---

## ▶️ Running the App Locally

```bash
npm run dev
```

This starts the app at [http://localhost:5173](http://localhost:5173).

---

## 🧪 Running Tests

```bash
npx vitest
```

```bash
npm run e2e
```

This runs all unit and integration tests using **Vitest and Cypress**.

---

## 📊 Test Coverage Report

```bash
npx vitest run --coverage
```

## 📊 View Coverage Report
The report will be saved to the coverage directory.

MacOS:
```bash
open coverage/index.html
```

Linux:
```bash
xdg-open coverage/index.html
```

Windows:
```bash
start coverage/index.html
```

This will generate a coverage report in the `/coverage` folder. Open `coverage/index.html` in a browser to view the results.

> Ensure `vitest.config.js` contains:
```js
export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
```

---

## 🌐 Deployment

You can deploy this app on **Netlify**:

1. Push your code to GitHub.
2. Go to [https://netlify.com](https://netlify.com) and click **"Add new site"**.
3. Connect your GitHub repo.
4. Set these build settings:

```
Build Command: npm run build
Publish Directory: dist
```

5. Click **"Deploy site"**.
6. Done! 🎉

---

## 🗂️ Project Structure

```
src/
│
├── app/                # Redux store config
├── components/         # Reusable UI components
├── features/           # Product & favorites logic
├── pages/              # Route-based views
├── tests/              # Unit & integration tests
├── App.jsx             # Root component
├── main.jsx            # App entry point
└── ...
```

---

## 📋 Notes

- API Source: [Fake Store API](https://fakestoreapi.com/)
- Favorites are stored in Redux state, not persisted.
- Written entirely in **JavaScript** (no TypeScript).

---

## 🧑‍💻 Author

**Your Name**  
[LinkedIn](https://linkedin.com/in/yourname) · [GitHub](https://github.com/your-username)

---

## 📄 License

MIT
