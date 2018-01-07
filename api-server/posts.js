const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  },
  "8616a608a4997b64": {
	id: '8616a608a4997b64',
	timestamp: 1510526683000,
	title: 'Is React the best Javascript framework?',
	body: 'Yes it is!',
	author: 'ReactFanatic',
	category: 'react',
	voteScore: 4,
	deleted: false,
	commentCount: 2
  },
  "8445bf0d44ae3dcc": {
	id: '8445bf0d44ae3dcc',
	timestamp: 1509449574000,
	title: "Redux the better way to manage your application's data",
	body: 'Here are the ways Redux can improve data management..',
	author: 'ReduxWizard',
	category: 'redux',
	voteScore: 3,
    deleted: false,
    commentCount: 1
  },
  "9d031a6fa369cecb": {
	id: '9d031a6fa369cecb',
	timestamp: 1506245492000,
	title: 'Udacity the coolest place to hang out since Chuck E. Cheese.',
	body: 'Its true!',
	author: 'Yu Dat City',
	category: 'udacity',
	voteScore: 7,
	deleted: false,
	commentCount: 3
  },
  "b80c30fdde431451": {
	id: 'b80c30fdde431451',
	timestamp: 1492154679000,
	title: 'Words that rhyme with Udacity.',
	body: 'Can anyone think of any?',
	author: 'BoredGuy123',
	category: 'udacity',
	voteScore: -2,
	deleted: false,
	commentCount: 1	  
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
