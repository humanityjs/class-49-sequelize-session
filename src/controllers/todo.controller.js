const { todo: TodoModel, user: UserModel } = require('../db/models');

module.exports = {
  // create todo
  createTodo(req, res) {
    let { name, userId } = req.body;

    if (name) {
      name = name.trim();
    }
    if (!name) {
      return res.status(400).json({
        message: 'Please supply a name for your todo. Or are you confused?'
      });
    }

    if (!userId) {
      return res.status(400).json({
        message: `Please pass in the user id. Don't be a ghost.`
      });
    }
    try {
      // const todo = ;
      TodoModel.create({ name, userId })
        .then(todo => {
          return res.send({
            message: 'Todo created successfully.',
            todo
          });
        })
        .catch(e => {
          console.log(e);
        });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      return res.status(500).send({
        message: 'Internal server error',
        error
      });
    }
  },

  // get all todos
  getTodos(req, res) {
    TodoModel.findAll({}).then(todos => {
      return res.send({
        message: 'Here are your todos',
        todos
      });
    });
  },

  // get todo by id
  getTodoById(req, res) {
    const { id } = req.params;
    TodoModel.findOne({
      where: {
        id
      }
    }).then(todo => {
      return res.send({
        message: 'Heres what you asked for',
        todo
      });
    });
  },

  // delete todo
  deleteTodo(req, res) {
    const { id } = req.params;
    TodoModel.findOne({
      where: {
        id
      }
    }).then(todo => {
      todo.destroy();
      return res.send({
        message: 'Todo deleted successfully'
      });
    });
  },

  // update todo
  updateTodo(req, res) {
    const { id } = req.params;
    const { name, completed } = req.body;

    TodoModel.findOne({
      where: {
        id
      }
    }).then(todo => {
      if (todo) {
        todo.update({
          name: name || todo.name,
          completed:
            completed === null || completed === undefined
              ? todo.completed
              : completed
        });
        return res.send({
          message: 'Todo updated successfully'
        });
      }
      return res.status(400).send({
        message: `We cannot find the todo. Maybe it's done.`
      });
    });
  },

  // get the user that created a todo
  getTodoAndUser(req, res) {
    const { id } = req.params;
    TodoModel.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['updatedAt']
      },
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['name']
        }
      ]
    }).then(todo => {
      return res.send({
        message: 'Heres what you asked for',
        todo
      });
    });
  },

  // get all todos for a user
  getTodosByUser(req, res) {
    const { userId } = req.params;

    UserModel.findOne({
      where: {
        id: userId
      },
      attributes: ['name'],
      include: [
        {
          model: TodoModel,
          as: 'todos',
          attributes: {
            exclude: ['updatedAt']
          }
        }
      ]
    }).then(user => {
      return res.send({
        message: 'Here you go!',
        user
      });
    });
  }
};
