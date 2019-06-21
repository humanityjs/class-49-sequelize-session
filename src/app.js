const express = require('express');
const bodyParser = require('body-parser');

const {
  createTodo,
  getTodos,
  getTodoById,
  deleteTodo,
  updateTodo,
  getTodoAndUser,
  getTodosByUser
} = require('./controllers/todo.controller');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
app.post('/todo', createTodo);
app.get('/todos', getTodos);
app.get('/todos/:id', getTodoById);
app.delete('/todos/:id', deleteTodo);
app.put('/todos/:id', updateTodo);
app.get('/todos/:id/user', getTodoAndUser);
app.get('/users/:userId/todos', getTodosByUser);
app.get('/', (req, res) => {
  return res.send({
    message: 'Welcome to our todo API 🤨'
  });
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
