var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'dog'
      };
      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('should toggle show completed', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toBe(true);
    });
  });

  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        text: 'Something to do'
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toBe(1);
      expect(res[0].text).toBe(action.text);
    });

    it('should toggle todo', () => {
      var todos = [
        {
          id: 1,
          text: 'Running',
          completed: false
        },
        {
          id: 2,
          text: 'Walking',
          completed: false
        }
      ];
      var action = {
        type: 'TOGGLE_TODO',
        id: 2
      };
      var res = reducers.todosReducer(df(todos), df(action));

      expect(res[1].completed).toBe(true);
      expect(res[1].completedAt).toExist();
    });

    it('should add existing todos', () => {
      var todos = [
        {
          id: 1,
          text: 'Running',
          completed: false
        },
        {
          id: 2,
          text: 'Walking',
          completed: false
        }
      ];
      var action = {
        type: 'ADD_TODOS',
        todos
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toBe(todos.length);
      expect(res[0]).toEqual(todos[0]);
    });
  });
});
