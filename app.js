// BUDGET CONTROLLER
var budgetController = (function() {
      var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
      };

      var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
      };

      var data = {
          allItems: {
            exp: [],
            inc: []
          },
          totals: {
            exp: 0,
            inc: 0
          }
      };

      return {
        addItem: function(type, des, val) {
            var newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            if(type === 'exp') {
               newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
               newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        testing: function() {
          console.log(data);
        }
      };

})();

// UI CONTROLLER
var UIController = (function() {
  var DOMStrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn',
      incomeContainer: '.income__list',
      expensesContainer: '.expenses__list'
  };
  return {
      getInput: function() {
          return {
              // Will be inc or exp
              type: document.querySelector(DOMStrings.inputType).value,
              description: document.querySelector(DOMStrings.inputDescription).value,
              value: document.querySelector(DOMStrings.inputValue).value
          };
      },

      addListItem: function(obj, type) {
          var html, newHtml, element;
          // Create HTML string with placeholder text

          if (type === 'inc') {
              element = DOMStrings.incomeContainer;
              html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
          } else if (type === 'exp') {
              element = DOMStrings.expensesContainer;
              html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
          }

          // Replace the placeholder text with actual data
          newHtml = html.replace('%id%', obj.id);
          newHtml = newHtml.replace('%description%', obj.description);
          newHtml = newHtml.replace('%value%', obj.value);
          // Insert the HTML into the DOM
          document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      },

      clearFields: function() {
          var fields, fieldsArray;

          fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

          fieldsArray = Array.prototype.slice.call(fields);

          fieldsArray.forEach(function(current, index, array) {
                current.value = "";
          });

          fieldsArray[0].focus();
      },

      getDOMStrings: function() {
          return DOMStrings;
      }
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
      var DOM = UICtrl.getDOMStrings();

      document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

      document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }

      });
    };

    var ctrlAddItem = function() {
        var input, newItem;
        /*
            TODO:
            1) get field input data
            2) Add item to budget controller
            3) Add the new item to UI
            4) calculate the budget
            5) Display budget to the UI
        */
        input = UICtrl.getInput();
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        UICtrl.addListItem(newItem, input.type);
        UICtrl.clearFields();
    };

    return {
      init: function() {
        console.log('App has started.');
        setupEventListeners();
      }
    };
})(budgetController, UIController);

controller.init();
