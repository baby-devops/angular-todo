# Angular Simple Todo List

A minimal **Todo List application** built with **Angular**, using **signals**, **reactive forms**, and **localStorage** for persistence.  
This project demonstrates how to manage form inputs, update state, and store tasks locally with a clean Angular structure.

---

## 🚀 Features

- Add tasks with **title** and **description**
- Mark tasks as **done / undone**
- Delete tasks
- **Persistent storage** using `localStorage`
- Built with **Angular signals** and **Reactive Forms**
- Simple **Bulma CSS** styling for UI

---

## 📂 Project Structure

```
src/
├── app/
│   ├── app.ts        # Main Angular component with logic
│   ├── app.html      # Template file (UI)
│   ├── app.scss      # Styling
```

---

## 🛠️ Tech Stack

- **Angular** 20
- **Angular Signals**
- **Reactive Forms**
- **Bulma CSS** for UI
- **Font Awesome** icons

---

## ⚙️ Installation & Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/jms-diaz/angular-todo.git
   cd angular-todo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   ng serve
   ```

4. Open your browser at:
   ```
   http://localhost:4200
   ```

---

## 📖 Usage

- Enter a **task title** (required) and an optional **description**.
- Click **Add** to save the task.
- Use the ✅ button to **mark as done/undone**.
- Use the ❌ delete button to **remove tasks**.
- Your tasks are **saved in localStorage** so they remain after page reloads.

---

## 📝 Example Task

```json
{
  "title": "Buy groceries",
  "description": "Milk, Bread, Eggs",
  "done": false
}
```

---

## 🎨 UI Preview

- Navbar with app title
- Form for adding tasks
- List of tasks displayed with **status indicator** and **delete option**

---

## 📌 Future Improvements

- Add due dates for tasks
- Add filtering (All, Completed, Pending)
- Sync with Firebase or a backend API
- Add animations

---

## 📄 License

This project is licensed under the MIT License.
