const { NotImplementedError } = require('../lib/errors');
// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }
  
  root() {
    return this._root;
  }

  add(data) {
    const newNode = { data, left: null, right: null };
    
    if (this._root === null) {
      this._root = newNode;
      return;
    }
    let current = this._root;
    while (true) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    let current = this._root;
    while (current !== null) {
      if (data === current.data) return true;
      current = data < current.data ? current.left : current.right;
    }
    return false;
  }

  find(data) {
    let current = this._root;
    while (current !== null) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    const removeNode = (node, dataToRemove) => {
      if (node === null) return null;
      if (dataToRemove < node.data) {
        node.left = removeNode(node.left, dataToRemove);
      } else if (dataToRemove > node.data) {
        node.right = removeNode(node.right, dataToRemove);
      } else {
        if (node.left === null && node.right === null) return null;
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        let minNode = node.right;
        while (minNode.left !== null) {
          minNode = minNode.left;
        }
        node.data = minNode.data;
        node.right = removeNode(node.right, minNode.data);
      }
      return node;
    };
    this._root = removeNode(this._root, data);
  }

  min() {
    if (this._root === null) return null;
    let current = this._root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (this._root === null) return null;
    let current = this._root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};