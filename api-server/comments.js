const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  },
  "bbadf558677c9eb7": {
	id: 'bbadf558677c9eb7',
	parentId: '8616a608a4997b64',
	timestamp: 1510557879000,
	body: 'React is the best!',
	author: 'ReactUser',
	voteScore: 2,
    deleted: false,
    parentDeleted: false	
  },
  "b0afe3808b8e4c48": {
	id: 'b0afe3808b8e4c48',
	parentId: '8616a608a4997b64',
	timestamp: 1510576581000,
	body: 'React > Angular!',
	author: 'ReactUser2',
	voteScore: 3,
    deleted: false,
    parentDeleted: false	
  }, 
  "4d344cd62d514e97": {
	id: '4d344cd62d514e97', 
	parentId: '8445bf0d44ae3dcc',
	timestamp: 1509413781000,
	body: 'Great article! 10/10 would read again.',
	author: 'ReduxUser',
	voteScore: 1,
    deleted: false,
    parentDeleted: false	
  },  
  "81f4a30e9b4ee19f": {
	id: '81f4a30e9b4ee19f',
	parentId: "9d031a6fa369cecb",
	timestamp: 1506246141000,
	body: 'OP is a',
	author: 'trollyburger',
	voteScore: 3,
	deleted: false,
	parentDeleted: false
  },
  "b0607ded148a48b9": {
	id: 'b0607ded148a48b9',
	parentId: "9d031a6fa369cecb",
	timestamp: 1506246321000,
	body: 'wonderful',
	author: 'NotUnderTheBridge',
	voteScore: -2,
	deleted: false,
	parentDeleted: false
  },
  '8f27a3149ff485ef': {
	id: '8f27a3149ff485ef',
	parentId: "9d031a6fa369cecb",
	timestamp: 1506246621000,
	body: 'contributor',
	author: 'NoFunAllowed',
	voteScore: -4,
	deleted: false,
	parentDeleted: false
  }
  '1f738bbc482c4a36': {
	id: '1f738bbc482c4a36',
	parentId: "b80c30fdde431451",
	timestamp: 1506246861000,
	body: 'There are none!',
	author: 'SoundLogic',
	voteScore: -3,
	deleted: false,
	parentDeleted: false	
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent (token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? {}
        : comments[id]
      )
  })
}

function add (token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    posts.incrementCommentCounter(token, comment.parentId, 1)
    res(comments[comment.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch(option) {
        case "upVote":
            comment.voteScore = comment.voteScore + 1
            break
        case "downVote":
            comment.voteScore = comment.voteScore - 1
            break
        default:
            console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent (token, post) {
    return new Promise((res) => {
        let comments = getData(token)
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

function disable (token, id) {
    return new Promise((res) => {
      let comments = getData(token)
      comments[id].deleted = true
      posts.incrementCommentCounter(token, comments[id].parentId, -1)
      res(comments[id])
    })
}

function edit (token, id, comment) {
    return new Promise((res) => {
        let comments = getData(token)
        for (prop in comment) {
            comments[id][prop] = comment[prop]
        }
        res(comments[id])
    })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}
