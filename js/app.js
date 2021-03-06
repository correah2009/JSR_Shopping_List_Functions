(function() { // protect the lemmings!

	/* 1
		@function newShoppingListItem
		@param item {string}
		@param price {number}
		@returns {object}
		@description
			given an item and a price, return
			an object that looks like this:
			{
				'item': 'eggs',
				'price': 1.59
			}
			OPTIONAL:
				- validate that item is string
					and price is number
					if invalid, throw error
			OPTIONAL:
				- validate that item has fewer than 10 characters
				- validate that price is less than 100 and has only
					two decimal places
	*/

	// implement function here

	const newShoppingListItem = (item = "", price = 0) => {
		if (typeof item !== "string") {
			throw new TypeError("Item not a string");
		} else if (typeof price !== "number" && price <= 0){
			throw new RangeError("Item not a positive number");
		}else {
			let listItem = {
				'item': item,
				'price': price
			}
			return listItem;
		}
	}

	const validateShoppingListItem = (newItem, validatingItem) => {
		if (typeof newItem !== "object" || typeof validatingItem !== "object" ){
			throw new Error("Arguments are not objects.");
		}else{
			let newItemKeys = Object.keys(newItem).sort();
  		let validatingItemKeys = Object.keys(validatingItem).sort();
  		return JSON.stringify(newItemKeys) === JSON.stringify(validatingItemKeys);
		}
	}

	const validateShoppingListItems = (newItems, validatingItem) => {
		if (typeof newItems !== "object" || typeof validatingItem !== "object" ){
			throw new Error("Arguments are not objects.");
		}else if (!Array.isArray(newItems)){
			throw new Error("Items is not an Array.");
		}else if (newItems.length === 0){
			return true;
		}else{
			let boolItems = newItems.map((item)=> {return validateShoppingListItem(item, newShoppingListItem())});
			return boolItems.reduce((acc, curr) => {return acc && curr});
		}
	}

	// TEST
	describe('1. newShoppingListItem', () => {
		it('should return an object with item and price attributes', () => {
			const shoppingListItem = newShoppingListItem('test', 1)
			chai.assert.equal(shoppingListItem.item, 'test');
			chai.assert.equal(shoppingListItem.price, 1);
		});
	});


	/* 2
		@function addToShoppingList
		@param item {object}
		@param list {array, []}
		@returns list
		@description
			add shoppinglist item object (ie:
				{
					'item': 'eggs',
					'price': 1.59
				}
			) to a list
			list is to DEFAULT to []
			OPTIONAL:
				- validate that the item is indeed a shoppingList item
				- if shoppingList item is not passed in, throw error
	*/

	// implement function here
const addToShoppingList = (item = {}, list = []) => {
	if (!validateShoppingListItem(item,newShoppingListItem())){
		throw new TypeError("Item not a valid shoppingList item");
	} else {
		list.push(item);
		return list
	}
}

	// TEST
	describe('2. addToShoppingList', () => {

		it('should return a list', () => {
			const newList = addToShoppingList({
				'item': 'test',
				'price': 1
			});
			chai.assert.equal(newList.length, 1)
		});

		it('should have one item that is a shopping list object', () => {
			const newList = addToShoppingList({
				'item': 'test',
				'price': 1
			});
			chai.assert.equal(newList[0].item, 'test');
			chai.assert.equal(newList[0].price, 1);
		})
	});

	/* 3
		@function removeFromShoppingList
		@param list {array, []}
		@returns list
		@description
			if array is empty, return it immediately
			if array has items, remove the LAST item
				and then return the array
	*/

	// implement function here

	const removeFromShoppingList = (list) => {
		if (list === []){
			return list;
		} else {
			list.pop();
			return list;
		}
	}

	// TEST
	describe('3. removeFromShoppingList', () => {
		it('should remove from the end of the list', () => {
			let list = addToShoppingList({
				'item': 'test',
				'price': 1
			});
			list = addToShoppingList({
				'item': 'test2',
				'price': 2
			}, list);

			// actually test function now
			list = removeFromShoppingList(list);

			chai.assert.equal(list.length, 1)
			// asert only item in list is 'test' with price 1
			chai.assert.equal(list[0].item, 'test')
			chai.assert.equal(list[0].price, 1)
		})
	});

	/* 4
		@function removeFirstItem
		@param list {array, []}
		@returns list
		@description
			if array is empty, return it immediately
			if array has items, remove the FIRST item
				and then return the array
	*/

	// implement function here

	const removeFirstItem = (list) => {
		if (list === []){
			return list;
		} else {
			list.shift();
			return list;
		}
	}

	// TEST
	describe('4. removeFirstItem', () => {
		it('should remove from the end of the list', () => {
			let list = addToShoppingList({
				'item': 'test',
				'price': 1
			});
			list = addToShoppingList({
				'item': 'test2',
				'price': 2
			}, list);
			list = removeFirstItem(list);

			chai.assert.equal(list.length, 1)
			// asert only item in list is 'test2' with price 2
			chai.assert.equal(list[0].item, 'test2')
			chai.assert.equal(list[0].price, 2)
		})
	});

	/* 5
		@function removeNthItem
		@param i {number}
		@param list {array, []}
		@returns list
		@description
			given `i`, an index < length of list
			remove that item from list and return the
			resulting list
			if...
				- what if `i` > length of list
				- `i` is < 0
				- `i` is not number
			^^ return error
	*/

	// implement function here
	const removeNthItem = (i, list) => {
		if ((typeof i !== "number") || (list.length < Math.abs(i)) || (i < 0)) {
			throw new Error("index not a positive number and greater than length of list");
		} else {
			list.splice(i, 1);
			return list;
		}
	}



	// TEST
	describe('5. removeNthItem', () => {
		it('should remove i-th item from list', () => {
			let list = addToShoppingList({
				'item': 'test',
				'price': 1
			});
			list = addToShoppingList({
				'item': 'test2',
				'price': 2
			}, list);
			list = addToShoppingList({
				'item': 'test3',
				'price': 3
			}, list);


			list = removeNthItem(1, list);

			chai.assert.equal(list.length, 2)

			chai.assert.equal(list[0].item, 'test')
			chai.assert.equal(list[0].price, 1)

			chai.assert.equal(list[1].item, 'test3')
			chai.assert.equal(list[1].price, 3)
		});

		it('should throw error if i < 0', () => {
			// if i < 0
			chai.assert.throws(() => {
				removeNthItem(-1, [])
			}, Error);
		});

		it('should throw error if i > length of list', () => {
			// if i > length of array
			chai.assert.throws(() => {
				removeNthItem(1, [])
			}, Error);
		});

		it('should throw error if i is not a number', () => {

			// if i is not a number
			chai.assert.throws(() => {
				removeNthItem('adfas', [])
			}, Error);
		})
	});

	/* 6
		@function removeNItems
		@param i {number}
		@param num {number}
		@param list {array, []}
		@returns list
		@description
			same as above but now we wish to remove ALL
			items from i to i+num and return the resulting list
			if...
				- `i` < 0
				- `i` or `num` is not a number
				- `i+num` > length of list
				- `num` > length of list
			^^ return error
	*/

	// implement function here
const removeNItems = (i, num = 0, list) => {
	if (typeof i !== 'number' || i < 0 ){
		throw new Error ('i not a positive number');
	}else if (typeof num !== 'number' || num < i) {
		throw new Error (' num is not number greater than i');
	}else if (num > list.length || (i + num) > list.length){
		throw new Error ('number and index + number is greater than list');
	}else {
		list.splice(i, 1 + num);
		return list;
	}
}

	// TEST
	describe('6. removeNItems', () => {
		it('should remove i-th item from list', () => {
			let list = addToShoppingList({
				'item': 'test',
				'price': 1
			});
			list = addToShoppingList({
				'item': 'test2',
				'price': 2
			}, list);
			list = addToShoppingList({
				'item': 'test3',
				'price': 3
			}, list);


			list = removeNItems(1, 1, list);

			chai.assert.equal(list.length, 1)

			chai.assert.equal(list[0].item, 'test')
			chai.assert.equal(list[0].price, 1)
		});

		it('should throw error if i + num < 0', () => {
			// if i < 0
			chai.assert.throws(() => {
				removeNItems(-1, 0, [])
			}, Error);
		});

		it('should throw error if i + num > length of list', () => {
			// if i > length of array
			chai.assert.throws(() => {
				removeNItems(1, 2, ['a', 'b'])
			}, Error);
		});

		it('should throw error if i is not a number', () => {

			// if i is not a number
			chai.assert.throws(() => {
				removeNItems('adfas', 1, [])
			}, Error);
		})

		it('should throw error if num is not a number', () => {

			// if i is not a number
			chai.assert.throws(() => {
				removeNItems(1, 'asasdfa', [])
			}, Error);
		})

		it('should throw error if num > length of list', () => {

			// if i is not a number
			chai.assert.throws(() => {
				removeNItems(1, 8, [])
			}, Error);
		})
	});

	/* 7
		@function smartRemoveItems
		@param i {number}
		@param list {array, []}
		@returns list
		@description
			- if `i` is < 0, remove i number of items
				from END of list
			- if `i` > length of list, return list immediately
			- if `i` > 0 remove i number of items
				from START of list
	*/

	// implement function here
const smartRemoveItems = (i, list) => {
	if (typeof i !== "number"){
		throw new Error("i is not a number");
	}else if (Math.abs(i) > list.length || i === 0){
		return list;
	}else if (i < 0){
		list.splice(list.length+i, Math.abs(i));
		return list;
	}else{
		list.splice(0, i);
		return list;
	}
}

	// TEST
	describe('7. smartRemoveItems', () => {
		it('should return list if i > length of list', () => {
			let list = [];
			list = smartRemoveItems(1, list);

			// [] is initial state of list
			// we expect `list` to also be length 0
			// ...or, empty essentially
			chai.assert.equal(list.length, 0);
		});

		it('should remove i number from end of list if i < 0', () => {
			let list = addToShoppingList({
				'item': 'test',
				'price': 1
			});
			list = addToShoppingList({
				'item': 'test2',
				'price': 2
			}, list);
			list = addToShoppingList({
				'item': 'test3',
				'price': 3
			}, list);

			list = smartRemoveItems(-1, list);

			chai.assert.equal(list.length, 2)
			chai.assert.equal(list[0].item, 'test')
			chai.assert.equal(list[0].price, 1)
			chai.assert.equal(list[1].item, 'test2')
			chai.assert.equal(list[1].price, 2)
		});

		it('should remove i number from START if list if i > 0', () => {
			let list = addToShoppingList({
				'item': 'test',
				'price': 1
			});
			list = addToShoppingList({
				'item': 'test2',
				'price': 2
			}, list);
			list = addToShoppingList({
				'item': 'test3',
				'price': 3
			}, list);

			list = smartRemoveItems(1, list);

			chai.assert.equal(list.length, 2)
			chai.assert.equal(list[0].item, 'test2')
			chai.assert.equal(list[0].price, 2)
			chai.assert.equal(list[1].item, 'test3')
			chai.assert.equal(list[1].price, 3)
		});
	});

	/* 8
		@function spliceItem
		@para item {object}
		@param i {number}
		@param list {array, []}
		@returns list
		@description
			- item must be an object that looks like this:
			{
				'item': 'eggs',
				'price': 1.59
			} (else throw error)
			- insert item into the ith index of the list
			- if i > length of list, just append
			- if i < 0, just prepend
	*/

	// implement function here
const spliceItem = (item, i, list) => {
	if (!validateShoppingListItem(item, newShoppingListItem())){
		throw new TypeError("Item not a shoppinglist item");
	} else if (i > list.length){
		addToShoppingList(item, list);
		return list;
	} else if (i < 0) {
		list.unshift(item);
		return list;
	} else {
		list.splice( i, 1, item)
		return list;
	}
}



	// TEST
	describe('8. spliceItem', () => {
		it('should throw an error if item is not valid', () => {
			chai.assert.throws(() => {
				spliceItem('invalidItem', 0, [])
			}, Error);
		});

		it('should insert item to the ith index of the list', () => {
			const list = spliceItem({
				'item': 'test',
				'price': 1,
			}, 0, [])

			chai.assert.equal(list[0].item, 'test')
			chai.assert.equal(list[0].price, 1)
		});

		it('should append to the end if i > length of list', () => {
			const list = spliceItem({
				'item': 'test',
				'price': 1,
			}, 9, [{
				'item': 'test0',
				'price': 0,
			}])

			chai.assert.equal(list[1].item, 'test')
			chai.assert.equal(list[1].price, 1)
		});

		it('should prepend if i < 0', () => {
			const list = spliceItem({
				'item': 'test',
				'price': 1,
			}, -1, [{
				'item': 'test0',
				'price': 0,
			}])

			chai.assert.equal(list[0].item, 'test')
			chai.assert.equal(list[0].price, 1)
		});

	});

	/* 9
		@function spliceItems
		@param items {list}
		@param i {number}
		@param list {array, []}
		@returns list
		@description
			- *EACH* item in `items` must be an object
			that looks like this:
			{
				'item': 'eggs',
				'price': 1.59
			} (else throw error)
			- insert items into the ith index of the list
			- if i > length of list, just append
			- if i < 0, just prepend
			- if `items` is empty, return list
	*/

	// implement function here
	const spliceItems = (items, i, list) => {
		if (!validateShoppingListItems(items, newShoppingListItem())) {
			throw new TypeError("Item not a shoppinglist item");
		} else if (items.length === 0){
			return list;
		} else if (i > list.length){
			return [...list, ...items];
		} else if (i < 0) {
			return [...items, ...list]
		} else {
			for (let k = 0; k < items.length; k++){
				list.splice(i, 0, items[k]);
				i++;
			}
			return list;
		}
	}

	// TEST
	describe('9. spliceItems', () => {
		it('should throw an error if item is not valid', () => {
			chai.assert.throws(() => {
				spliceItems([{
					'item': 'test',
					'price': 1,
				},'invalidItem'], 0, [])
			}, Error);
		});

		it('should insert items to the ith index of the list', () => {
			const list = spliceItems([{
				'item': 'test',
				'price': 1,
			}, {
				'item': 'test2',
				'price': 2,
			}], 0, [{
				'item': 'test3',
				'price': 3,
			}])

			chai.assert.equal(list[0].item, 'test')
			chai.assert.equal(list[0].price, 1)
			chai.assert.equal(list[1].item, 'test2')
			chai.assert.equal(list[1].price, 2)
		});

		it('should append to the end if i > length of list', () => {
			const list = spliceItems([{
				'item': 'test',
				'price': 1,
			}], 9, [{
				'item': 'test0',
				'price': 0,
			}])

			chai.assert.equal(list[1].item, 'test')
			chai.assert.equal(list[1].price, 1)
		});

		it('should prepend if i < 0', () => {
			const list = spliceItems([{
				'item': 'test',
				'price': 1,
			}], -1, [{
				'item': 'test0',
				'price': 0,
			}])

			chai.assert.equal(list[0].item, 'test')
			chai.assert.equal(list[0].price, 1)
		});

		it('should return list if items is empty', () => {
			const list = spliceItems([], 0, []);
			chai.assert.equal(list.length, 0)
		})
	});

	/* 10
		@function combineLists
		@param items1 {list}
		@param items2 {list}
		@returns list
		@description
			given two lists of items
			- *EACH* item in `items` must be an object
			that looks like this:
			{
				'item': 'eggs',
				'price': 1.59
			} (else throw error)
			- return ONE list that contains items in
			items1 THEN items in items2 as a single array
	*/

	// implement function here

	const combineLists = (items1, items2) => {
		if (!validateShoppingListItems(items1, newShoppingListItem()) &&
				!validateShoppingListItems(items2, newShoppingListItem())){
					throw new Error("Items do not have valid objects");
				}
		else {
			return [...items1, ...items2];
		}
	}


	// TEST
	describe('10. combineLists', () => {
		it('should throw an error if item is not valid', () => {
			chai.assert.throws(() => {
				combineLists([{
					'item': 'test',
					'price': 1,
				},'invalidItem'], [{
					'item': 'test2',
					'price': 2,
				}])
			}, Error);
		});

		it('should return single list with items of both lists', () => {
			const newList = combineLists([{
					'item': 'test',
					'price': 1,
				}], [{
					'item': 'test2',
					'price': 2,
				}]);

			chai.assert.equal(newList[0].item, 'test')
			chai.assert.equal(newList[0].price, 1)
			chai.assert.equal(newList[1].item, 'test2')
			chai.assert.equal(newList[1].price, 2)
		});
	});

	/* 11
		@function splitListAt
		@param i {number}
		@param list {array, []}
		@returns list
		@description
			given a number i that is within bounds of
			`list`, break it into two lists where
			`list1` has all items less than or equal to i
			and `list2` has all items > i
			- if `i` < 0, `list1` has all items and `list2`
				is empty list
			- if `i` > length of list, list1 is empty and `list2`
				has all items

			- always return a list that looks like this:
				[list1, list2]

	*/

	// implement function here
	const splitListAt = (i, list) => {
		let list1 = [];
		let list2 = [];
		if (typeof i !== "number" && !Array.is(list)){
			throw new Error ("i is not a number and list is not an array  ");
		}else if (i < 0) {
			return [list, []];
		}else if (i > list.length) {
			return [[], list];
		}else {
			list1 = list.slice(0, i+1);
			list2 = list.slice(i, list.length - 1);
			return [list1, list2];
		}
	}


	// TEST
	describe('11. splitListAt', () => {
		it('should break list into two at index', () => {
			const [list1, list2] = splitListAt(1, [{
					'item': 'test',
					'price': 1,
				}, {
					'item': 'test2',
					'price': 2,
				}]);

			chai.assert.equal(list1[0].item, 'test')
			chai.assert.equal(list1[0].price, 1)
			chai.assert.equal(list1[1].item, 'test2')
			chai.assert.equal(list1[1].price, 2)
			chai.assert.equal(list2.length, 0)

		});

		it('should put all items into list1 if i < 0', () => {
			const [list1, list2] = splitListAt(-1, [{
					'item': 'test',
					'price': 1,
				}, {
					'item': 'test2',
					'price': 2,
				}]);

			chai.assert.equal(list1[0].item, 'test')
			chai.assert.equal(list1[0].price, 1)
			chai.assert.equal(list1[1].item, 'test2')
			chai.assert.equal(list1[1].price, 2)
			chai.assert.equal(list2.length, 0)

		});

		it('should put all items into list2 if i > length of list', () => {
			const [list1, list2] = splitListAt(100, [{
					'item': 'test',
					'price': 1,
				}, {
					'item': 'test2',
					'price': 2,
				}]);

			chai.assert.equal(list1.length, 0)
			chai.assert.equal(list2[0].item, 'test')
			chai.assert.equal(list2[0].price, 1)
			chai.assert.equal(list2[1].item, 'test2')
			chai.assert.equal(list2[1].price, 2)


		});

		it('should return two lists', () => {
			const [list1, list2] = splitListAt(1, [{
					'item': 'test',
					'price': 1,
				}, {
					'item': 'test2',
					'price': 2,
				}]);

			chai.assert.isArray(list1)
			chai.assert.isArray(list2)
		})

	});

	/* 12
		@function canExpressCheckout
		@param list {array, []}
		@returns {boolean}
		@description
			if there are fewer than 10 items
			in list, return true
	*/

	// implement function here
	const canExpressCheckout = (list) => {
		if (!Array.isArray(list)){
			throw new Error('List is not an array');
		}else {
			return list.length < 10;
		}
	}
	// TEST
	describe('12. canExpressCheckout', () => {
		it('should return true if num items < 10', () => {
			chai.assert.equal(canExpressCheckout([{
					'item': 'test',
					'price': 1,
				}, {
					'item': 'test2',
					'price': 2,
				}]), true);
		})
	});

	/* 13
		@function computeSum
		@param list {array, []}
		@returns {number}
		@description
			given a list of objects that look like this:
			{
				'item': 'eggs',
				'price': 1.59
			}
			- sum all the price items and return value
	*/

	// implement function here
	const computeSum = (list) => {
		if (!Array.isArray(list) && validateShoppingListItems(list, newShoppingListItem())) {
			throw new Error("List is not an array with valid items");
		}else if (list.length === 0){
			return 0;
		}else {
			return list.map((item) => item.price).reduce((acc, curr) => acc + curr);
		}
	}
	// TEST
	describe('13. computeSum', () => {
		it('should return sum of all item prices in array', () => {
			const sum = computeSum([{
					'item': 'test',
					'price': 1,
				}, {
					'item': 'test2',
					'price': 2,
				}]);

			chai.assert.equal(sum, 3);
		});
		it('should sum all the price of large list and return value', () => {
			const sum =  computeSum([
				newShoppingListItem('test', 1),
				newShoppingListItem('test2', 2),
				newShoppingListItem('test3', 3),
				newShoppingListItem('test4', 4)
			]);

			chai.assert.equal(sum, 10)
		});
	});

	/* 14
		@function computeSumWithTax
		@param list {array, []}
		@param taxRate {number, 8.125}
		@returns {number}
		@description
			given a list of objects that look like this:
			{
				'item': 'eggs',
				'price': 1.59
			}
			- sum all the price items and return value AND
				apply tax value
			- note that tax is passed in as percent not decimal

	*/

	// implement function here
	const computeSumWithTax = (list, taxRate) => {
		if (typeof taxRate !== "number"){
			throw new Error('taxRate is not a number');
		}else {
			return computeSum(list) * (1+(taxRate/100));
		}
	}
	// TEST
	describe('14. computeSumWithTax', () => {
		it('should return sum of all item prices in array + taxes', () => {
			const sum = computeSumWithTax([{
					'item': 'test',
					'price': 1,
				}, {
					'item': 'test2',
					'price': 2,
				}], 10);

			// stupid hack to prevent the 3.3000000000000003 error...
			chai.assert.equal(Math.floor(100*sum)/100, 3.3);
		});
	});

	/* 15
		@function computeSumInRange
		@param i {number}
		@param j {number}
		@param list {array, []}
		@returns {number}
		@description
			given a list of objects that look like this:
			{
				'item': 'eggs',
				'price': 1.59
			}
			- sum all the price items FROM start index `i` and
				end index `j` and return value
			- if i > j, throw error
			- if i or j not in range, throw error
	*/

	// implement function here
	const computeSumInRange = (i, j, list) => {
		const listlen = list.length;
		if (!validateShoppingListItems(list, newShoppingListItem()) &&
				typeof i === "number" &&
				typeof j === "number") {
					throw new TypeError("List is not valid, i and j are not numbers");
		} else if (i > j) {
			throw new Error("i is greater than j");
		} else if (i < 0 || j < 0){
			throw new Error("i or j is less than 0");
		} else if (i > listlen || j > listlen){
			throw new Error("i or j is longer than list");
		} else {
			let range = list.slice(i, j);
			range.push(list[j]);
			return computeSum(range);
		}
	}

	// TEST
	describe('15. computeSumInRange', () => {
		it('should throw error if i > j', () => {
			chai.assert.throws(() => {
				computeSumInRange(100, 1, [])
			}, Error)
		})

		it('should throw error if i < 0', () => {
			chai.assert.throws(() => {
				computeSumInRange(-1, 1, [])
			}, Error)
		})

		it('should throw error if i > length of list', () => {
			chai.assert.throws(() => {
				computeSumInRange(100, 101, [])
			}, Error)
		})

		it('should throw error if j < 0', () => {
			chai.assert.throws(() => {
				computeSumInRange(0, -1, [])
			}, Error)
		})

		it('should throw error if j > length of list', () => {
			chai.assert.throws(() => {
				computeSumInRange(0, 100, [])
			}, Error)
		})

		it('should sum all the price items FROM start index `i` and end index `j` and return value', () => {
			const sum =  computeSumInRange(1, 3, [
				newShoppingListItem('test', 1),
				newShoppingListItem('test2', 2),
				newShoppingListItem('test3', 3),
				newShoppingListItem('test4', 4)
			]);

			chai.assert.equal(sum, 9)
		})
	});

})();
