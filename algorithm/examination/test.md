# JavaScript中关于算法的题目合集

会搜集日常中有意思关于算法的题目

## JavaScript中奖list数据转为tree数组

完成 convert(list) 函数，实现将 list 转为 tree  
业务上经常要用到数组转树形结构的函数，比如从后台服务器拿到list数据

```js

var nodes = [
  { "id": 1, "pId": 0, "name": "父节点1 - 展开", "open": true },
  { "id": 11, "pId": 1, "name": "父节点11 - 折叠" },
  { "id": 12, "pId": 1, "name": "父节点12 - 折叠" },
  { "id": 13, "pId": 1, "name": "父节点13 - 没有子节点" },
  { "id": 2, "pId": 0, "name": "父节点2 - 折叠" },
  { "id": 21, "pId": 2, "name": "父节点21 - 展开", "open": true },
  { "id": 22, "pId": 2, "name": "父节点22 - 折叠" },
  { "id": 23, "pId": 2, "name": "父节点23 - 折叠" },
  { "id": 3, "pId": 0, "name": "父节点3 - 没有子节点" }
];

```

但是我们想要的是树形文档结构的数组树，如下：

```js
var tree = [
  {
    "id": 1,
    "pId": 0,
    "name": "父节点1 - 展开",
    "open": true,
    "children": [
      {
        "id": 11,
        "pId": 1,
        "name": "父节点11 - 折叠"
      },
      {
        "id": 12,
        "pId": 1,
        "name": "父节点12 - 折叠"
      },
      {
        "id": 13,
        "pId": 1,
        "name": "父节点13 - 没有子节点"
      }
    ]
  },
  {
    "id": 2,
    "pId": 0,
    "name": "父节点2 - 折叠",
    "children": [
      {
        "id": 21,
        "pId": 2,
        "name": "父节点21 - 展开",
        "open": true
      },
      {
        "id": 22,
        "pId": 2,
        "name": "父节点22 - 折叠"
      },
      {
        "id": 23,
        "pId": 2,
        "name": "父节点23 - 折叠"
      }
    ]
  },
  {
    "id": 3,
    "pId": 0,
    "name": "父节点3 - 没有子节点"
  }]
```

实现convert函数：

```js
/* 
 * @param list {object[]}, 入参数组
 * @param parentKey {string} 当前节点字段
 * @param currentKey {string} 父节点字段
 * @param rootValue {any} 根节点标识
 * @return object
 */
function convert(list, parentKey, currentKey, rootValue) {
  // your code here
}
```

完成代码如下：

```js

function listToTree(data, options) {
  options = options || {};
  var ID_KEY = options.idKey || 'id';
  var PARENT_KEY = options.parentKey || 'pId';
  var CHILDREN_KEY = options.childrenKey || 'children';

  var tree = [],
    childrenOf = {};
  var item, id, parentId;

  for (var i = 0, length = data.length; i < length; i++) {
    item = data[i];
    id = item[ID_KEY];
    parentId = item[PARENT_KEY] || 0;
    childrenOf[id] = childrenOf[id] || []; 
    item[CHILDREN_KEY] = childrenOf[id]; 
    if (parentId != 0) {
      childrenOf[parentId] = childrenOf[parentId] || []; 
      console.info(parentId);
      childrenOf[parentId].push(item);
    } else {
      tree.push(item);
    }
  };

  return tree;
}
```